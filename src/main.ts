import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidUnknownValues: true,
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('Coding Challenge')
        .setDescription('Back-end API for an apartments rental company.')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description:
                    'Please provide the authentication token you receiced from the signin/signup request',
                name: 'Authorization',
                type: 'http',
                bearerFormat: 'Bearer',
                in: 'Header',
                scheme: 'Bearer',
            },
            'access_token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3334);
}
bootstrap();
