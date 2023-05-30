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

  it('/user/register ~ Test incorrect DTO format', async () => {
    // Create incorrect format payload
    const payload = {
      email: 'namph.tech@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({ payload });

    expect(response.status).toBe(400);
    expect(response.text).toContain(
      'password must be shorter than or equal to 20 characters',
    );
  });

  it('/user/register ~ Test wrong http method', async () => {
    const response = await request(app.getHttpServer()).get('/user/register');
    expect(response.status).toBe(404);
  });

  it('/user/register ~ Test exception user already existed', async () => {
    // Create mockUser in the DB using userRepository
    const mockPayload = {
      email: 'namph.tech@gmail.com',
      password: 'namph.tech@gmail.com',
    };
    await request(app.getHttpServer()).post('/user/register').send(mockPayload);

    // Create the same mockData for the payload
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send(mockPayload);
    expect(response.status).toBe(409);
    expect(response.text).toContain('User already existed');
  });

  it('/user/register ~ Test create user success', async () => {
    // Create a valid payload
    const mockPayload = {
      email: 'namph.tech@gimail.com',
      password: 'namph.tech@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send(mockPayload);
    expect(response.status).toBe(201);
  });
});
