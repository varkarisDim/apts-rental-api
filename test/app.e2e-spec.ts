import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidUnknownValues: true,
            }),
        );
        await app.init();
        await app.listen(3335);

        prisma = app.get(PrismaService);
        await prisma.cleanDb();
        pactum.request.setBaseUrl('http://localhost:3335');
    });

    afterAll(() => {
        app.close();
    });

    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'testEmail@test.io',
            password: '789',
            firstName: 'testFirstName',
            lastName: 'testLastName',
        };

        describe('Signup', () => {
            it('should return 400 for no email', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        password: dto.password,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    })
                    .expectStatus(400); // 400 for bad user input/bad request
            });
        });
        describe('Signup', () => {
            it('should return 400 for no password', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        email: dto.email,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    })
                    .expectStatus(400); // 400 for bad user input/bad request
            });
        });
        describe('Signup', () => {
            it('should return 400 for no body', () => {
                return pactum.spec().post('/auth/signup').expectStatus(400); // 400 for bad user input/bad request
            });
        });
        describe('Signup', () => {
            it('should signup', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201); // 201 for created
            });
        });

        describe('Signin', () => {
            it('should return 400 for no email', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        password: dto.password,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    })
                    .expectStatus(400); // 400 for bad user input/bad request
            });
        });
        describe('Signin', () => {
            it('should return 400 for no password', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        email: dto.email,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    })
                    .expectStatus(400); // 400 for bad user input/bad request
            });
        });
        describe('Signin', () => {
            it('incorrect email', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        email: 'wrongEmail@wrong.io',
                        password: dto.password,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    })
                    .expectBody({
                        access_token: 'Incorrect email',
                    });
            });
        });
        describe('Signin', () => {
            it('incorrect password', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({
                        email: dto.email,
                        password: 'wrongPsw',
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                    })
                    .expectBody({
                        access_token: 'Incorrect password',
                    });
            });
        });
        describe('Signin', () => {
            it('should return 400 for no body', () => {
                return pactum.spec().post('/auth/signin').expectStatus(400); // 400 for bad user input/bad request
            });
        });
        describe('Signin', () => {
            it('should signin', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(200) // 200 for OK
                    .stores('userAT', 'access_token'); // save only here not on sign up as it executes last in serialized order
            });
        });
    });

    describe('User', () => {
        describe('Get info', () => {
            it('should get info on current user', () => {
                return pactum
                    .spec()
                    .get('/users/info')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAT}',
                    })
                    .expectStatus(200);
            });
        });
        describe('Get info', () => {
            it('should get info on current user', () => {
                return pactum
                    .spec()
                    .get('/users/info')
                    .withHeaders({
                        Authorization: 'Bearer wrongBearerToken',
                    })
                    .expectBody({
                        statusCode: 401,
                        message: 'Unauthorized',
                    });
            });
        });
    });
});
