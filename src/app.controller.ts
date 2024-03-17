import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Post('populateDb')
    populateDb(): Promise<string> {
        return this.appService.populateDb();
    }
}
