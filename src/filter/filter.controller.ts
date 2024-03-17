import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { SearchPerimeterDto } from '../apartment/dto';
import { FiltersService } from './filter.service';
import { Apartment } from '@prisma/client';

@Controller('filters')
export class FiltersController {
    constructor(private filtersService: FiltersService) {}

    @Get('city/:city')
    getAptsByCity(
        @Param('city') city: string,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        return this.filtersService.getAptsByCity(city);
    }

    @Get('country/:country')
    getAptsByCountry(
        @Param('country') country: string,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        return this.filtersService.getAptsByCountry(country);
    }

    @Get('rooms/:rooms')
    getAptBy(
        @Param('rooms', ParseIntPipe) rooms: number,
    ): Promise<{ message: string; apartments: Apartment[] }> {
        return this.filtersService.getAptsByRooms(rooms);
    }

    @Post('geolocation')
    getAptsByGeolocation(@Body() dto: SearchPerimeterDto) {
        return this.filtersService.getAptsByGeolocation(dto);
    }
}
