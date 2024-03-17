import { Module } from '@nestjs/common';
import { FiltersService } from './filter.service';
import { FiltersController } from './filter.controller';

@Module({
    providers: [FiltersService],
    controllers: [FiltersController],
})
export class FiltersModule {}
