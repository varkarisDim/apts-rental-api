import { Controller, Get, Param, Put } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { Apartment } from '@prisma/client';

@Controller('favourites')
export class FavouriteController {
    constructor(private favouriteService: FavouriteService) {}

    @Get()
    getFavourites(): Promise<Apartment[]> {
        return this.favouriteService.getFavourites();
    }

    @Put('markfavourite/:urbanId')
    markFavouriteApartment(
        @Param('urbanId') urbanId: string,
    ): Promise<{ message: string }> {
        return this.favouriteService.markFavouriteApartment(urbanId);
    }
}
