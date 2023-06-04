import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { appDataSource } from './app.e2e-spec';
import { User } from '../src/user/user.entity';

describe('For Route /auth... (e2e)', () => {
  let app: INestApplication;
  const mockPayload = {
    email: 'namph.tech@gmail.com',
    password: 'namph.tech@gmail.com',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create an existing entity
    await request(app.getHttpServer()).post('/user/register').send(mockPayload);
  });

  afterAll(async () => {
    appDataSource.getRepository(User).clear();
  });

  it('/auth/login ~ Test incorrect DTO format', async () => {
    // Create incorrect format payload
    const payload = {
      email: 'namph.tech@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...payload });

    expect(response.status).toBe(400);
    expect(response.text).toContain(
      'password must be shorter than or equal to 20 characters',
    );
  });

  it('/auth/login ~ Test wrong http method', async () => {
    const response = await request(app.getHttpServer()).get('/auth/login');
    expect(response.status).toBe(404);
  });

  it("/auth/login ~ Test user doesn't exist", async () => {
    // Run the http request with a random UserInfo payload
    const payload = {
      email: 'namph.tech@giiiiimail.com',
      password: 'namph.tech@gmail.com',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(payload);
    expect(response.status).toBe(201);
    expect(response.text).toContain('accessToken');
  });

  it('/auth/login ~ Test password mismatched', async () => {
    // Run the http request with falsy password
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...mockPayload, password: 'incorrectPassword' });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Wrong password');
  });

  it('/auth/login ~ Test login successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockPayload);
    // Run the http request
    expect(response.status).toBe(201);
  });

  it('/auth/login ~ Test fail getting access to a protected route', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/check-protected-route')
      .send(mockPayload);
    // Run the http request
    expect(response.status).toBe(401);
    expect(response.text).toContain('Unauthorized');
  });

  it('/auth/login ~ Test fail getting access to a protected route', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockPayload);

    const { accessToken } = await JSON.parse(loginResponse.text);

    const response = await request(app.getHttpServer())
      .post('/auth/check-protected-route')
      .set('Authorization', ` Bearer ${accessToken}`)
      .send(mockPayload);
    // Run the http request
    expect(response.status).toBe(201);
    expect(response.text).toContain('OK');
  });
});
