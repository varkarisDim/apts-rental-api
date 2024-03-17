import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as argon from 'argon2';

const apartments = require('../mock-data/apartments');
let users = require('../mock-data/users');

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async populateDb(): Promise<string> {
        for (const user of users) {
            user.password = await argon.hash(user.password);
        }

        await this.prisma.user.createMany({
            data: users,
            skipDuplicates: true,
        });
        await this.prisma.apartment.createMany({
            data: apartments,
            skipDuplicates: true,
        });
        return 'DB was populated successfully';
    }
}
