import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }

    async cleanDb(): Promise<void> {
        // use transaction to do it in the specified order
        // so we do not leave trangling apartments with no
        // user
        await this.$transaction([
            this.apartment.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
