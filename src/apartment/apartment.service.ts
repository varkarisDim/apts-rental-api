import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';

@Injectable()
export class ApartmentService {
    constructor(private prisma: PrismaService) {}

    async registerApartment(user: User, apartment: RegisterDto) {
        const existingApartment = await this.prisma.apartment.findUnique({
            where: {
                urbanId: apartment.urbanId,
            },
        });

        if (existingApartment) {
            return {
                message: `The apartment with urbanId '${apartment.urbanId}' is already registered`,
            };
        }

        const registeredApartment = await this.prisma.apartment.create({
            data: {
                city: apartment.city,
                lat: apartment.lat,
                lng: apartment.lng,
                rooms: apartment.rooms,
                country: apartment.country,
                urbanId: apartment.urbanId,
                userId: user.id,
            },
        });

        return {
            message: `Successfully registered your apartment with urbanId '${registeredApartment.urbanId}'`,
        };
    }
}
