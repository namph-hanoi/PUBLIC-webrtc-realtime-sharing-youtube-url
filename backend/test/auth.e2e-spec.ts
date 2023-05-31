import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from 'src/user/user.module';
import { appDataSource } from './app.e2e-spec';
import { User } from '../src/user/user.entity';

describe('For Route /user... (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login ~ Test incorrect DTO format', async () => {
    // Create incorrect format payload
    const payload = {
      email: 'namph.tech@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ payload });

    expect(response.status).toBe(500);
    // expect(response.text).toContain(
    //   'password must be shorter than or equal to 20 characters',
    // );
  });

  it('/auth/login ~ Test wrong http method', async () => {
    const response = await request(app.getHttpServer()).get('/auth/login');
    expect(response.status).toBe(404);
  });

  it("/auth/login ~ Test user doesn't exist", async () => {
    // Run the http request with a random UserInfo payload
  });

  it('/auth/login ~ Test password mismatched', async () => {
    // Create an existing entity
    // Run the http request with falsy password
    //
    // const mockPayload = {
    //   email: 'namph.tech@gmail.com',
    //   password: 'namph.tech@gmail.com',
    // };
    // const response = await request(app.getHttpServer())
    //   .post('/auth/login')
    //   .send(mockPayload);
    // expect(response.status).toBe(201);
  });

  it('/auth/login ~ Test login successfully', async () => {
    // Create an existing entity
    // Run the http request
  });
});
