import { Injectable } from '@nestjs/common';
import { Apartment, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUserApartments(
        user: User,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        const userApartments = await this.prisma.apartment.findMany({
            where: {
                userId: user.id,
            },
        });

        return {
            message: `These are the apartments the user ${user.firstName} ${user.lastName} is currently renting out`,
            apartments: userApartments,
        };
    }
}
