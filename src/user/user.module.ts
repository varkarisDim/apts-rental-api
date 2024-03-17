import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtService],
})
export class UsersModule {}
