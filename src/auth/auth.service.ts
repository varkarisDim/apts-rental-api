import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async signup(dto: AuthDto): Promise<{ access_token: string }> {
        // make the test before calling the prisma create else the
        // auto increment unique id will increase even if the object
        // isn't added to the db
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        });

        if (existingUser) {
            return { access_token: 'Email is already in use.' };
        }
        const hashedPsw = await argon.hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPsw,
                firstName: dto.firstName,
                lastName: dto.lastName,
            },
        });
        return this.signToken(user.id, user.email);
    }

    async signin(dto: AuthDto): Promise<{ access_token: string }> {
        let person: any;

        person = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!person) {
            return { access_token: 'Incorrect email' };
        }

        const pswMatches = await argon.verify(person.password, dto.password);
        if (!pswMatches) {
            return { access_token: 'Incorrect password' };
        }

        return this.signToken(person.id, person.email);
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: '180m',
            secret: this.config.get('JWT_SECRET'),
        });

        return {
            access_token: access_token,
        };
    }
}
