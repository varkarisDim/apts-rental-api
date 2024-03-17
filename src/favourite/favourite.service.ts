import { Injectable } from '@nestjs/common';
import { Apartment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavouriteService {
    constructor(private prisma: PrismaService) {}

    async getFavourites(): Promise<Apartment[]> {
        return await this.prisma.apartment.findMany({
            where: {
                isFavourite: true,
            },
        });
    }

    async markFavouriteApartment(
        urbanId: string,
    ): Promise<{ message: string }> {
        const apartment = await this.prisma.apartment.findUnique({
            where: {
                urbanId: urbanId,
            },
        });

        if (!apartment) {
            return {
                message: `Apartment with urbanId ${urbanId} is not registered`,
            };
        }

        if (apartment.isFavourite) {
            return {
                message: `Apartment with urbanId ${urbanId} is already a favourite`,
            };
        }

        await this.prisma.apartment.update({
            where: {
                urbanId: urbanId,
            },
            data: {
                isFavourite: true,
            },
        });

        return {
            message: `Apartment with urbanId ${urbanId} is now a favourite`,
        };
    }
}
