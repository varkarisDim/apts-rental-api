import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RegisterDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@Controller('apartments')
export class ApartmentController {
    constructor(private apartmentService: ApartmentService) {}

    @ApiBearerAuth('access_token')
    @UseGuards(JwtGuard)
    @Post('registerapartment')
    registerApartment(@GetUser() user: User, @Body() apartment: RegisterDto) {
        return this.apartmentService.registerApartment(user, apartment);
    }
}
