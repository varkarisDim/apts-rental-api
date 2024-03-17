import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { FiltersModule } from './filter/filter.module';
import { UsersModule } from './user/user.module';
import { FavouriteModule } from './favourite/favourite.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApartmentModule } from './apartment/apartment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        FiltersModule,
        UsersModule,
        FavouriteModule,
        ApartmentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
