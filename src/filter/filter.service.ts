import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Apartment } from '@prisma/client';
import { SearchPerimeterDto } from '../apartment/dto';
import { PrismaService } from '../prisma/prisma.service';
import { distanceTo } from 'geolocation-utils';

@Injectable()
export class FiltersService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    async getAptsByCity(
        city: string,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        const apartments = await this.prisma.apartment.findMany({
            where: {
                city: city,
            },
        });

        return {
            message: `Found ${apartments.length} apartment(s) in the city of ${city}`,
            apartments,
        };
    }

    async getAptsByCountry(
        country: string,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        const apartments = await this.prisma.apartment.findMany({
            where: {
                country: country,
            },
        });

        return {
            message: `Found ${apartments.length} apartment(s) in the country of ${country}`,
            apartments,
        };
    }

    async getAptsByRooms(
        rooms: number,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        const apartments = await this.prisma.apartment.findMany({
            where: {
                rooms: rooms,
            },
        });

        return {
            message: `Found ${apartments.length} apartment(s) with ${rooms} rooms`,
            apartments,
        };
    }

    async getAptsByGeolocation(dto: SearchPerimeterDto) {
        const apartments = (await this.prisma.apartment.findMany()).map(
            (el) => {
                return {
                    id: el.id,
                    city: el.city,
                    lat: parseFloat(el.lat.toString()),
                    lng: parseFloat(el.lng.toString()),
                    rooms: el.rooms,
                    country: el.country,
                    urbanId: el.urbanId,
                };
            },
        );

        const apartmentsLocations = apartments.map((el) => {
            return {
                lat: parseFloat(el.lat.toString()),
                lng: parseFloat(el.lng.toString()),
            };
        });

        const aptsLocationAndDistance = apartmentsLocations.map((el, index) => {
            return {
                ...apartments[index],
                distance: distanceTo(
                    { lat: dto.lat, lon: dto.lng },
                    { lat: el.lat, lon: el.lng },
                ),
            };
        });

        const aptsWithinRadius = aptsLocationAndDistance.filter(
            (el) => el.distance < dto.radius * 1000,
        );
        if (aptsWithinRadius.length !== 0) {
            return {
                message: `There ${aptsWithinRadius.length} apartments within a ${dto.radius}KM radius`,
                nearestApartments: aptsWithinRadius,
            };
        }

        const nearest = aptsLocationAndDistance.reduce((prev, curr) => {
            return prev.distance < curr.distance ? prev : curr;
        });

        return {
            message: `There no apartments within ${dto.radius}KM. This is the nearest apartment to location (${dto.lat},${dto.lng})`,
            nearestApartments: nearest,
        };
    }
}
