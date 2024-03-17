import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { Apartment, User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('info')
    getUserInfo(@GetUser() user: User) {
        return user;
    }

    @Get('apartments')
    getUserApartments(@GetUser() user: User): Promise<{
        message: string;
        apartments: Apartment[];
    }> {
        return this.usersService.getUserApartments(user);
    }
}
