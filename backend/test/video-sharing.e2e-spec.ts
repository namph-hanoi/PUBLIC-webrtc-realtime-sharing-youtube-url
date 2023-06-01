import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from 'src/user/user.module';
import { appDataSource } from './app.e2e-spec';
import { User } from '../src/user/user.entity';

describe('For Route /user... (e2e)', () => {
  let app: INestApplication;
  const mockPayload = {
    email: 'namph.tech@gmail.com',
    password: 'namph.tech@gmail.com',
  };
  let accessToken = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create an existing entity
    await request(app.getHttpServer()).post('/user/register').send(mockPayload);
    // Login and extract  accessToken for later use
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockPayload);

    accessToken = await JSON.parse(loginResponse.text).accessToken;
  });

  afterAll(async () => {
    appDataSource.getRepository(User).clear();
  });

  it('/video-sharing/create ~ Test incorrect DTO format', async () => {
    // expect response status to be 400, and message contains 'Invalid youtube link'
    const response = await request(app.getHttpServer())
      .post('/video-sharing/create')
      .set('Authorization', ` Bearer ${accessToken}`)
      .send({
        url: 'http://www.youtube.com/fake-no-secured-youtube',
      });
    expect(response.status).toBe(400);
    expect(response.text).toContain('Invalid youtube link');
  });

  it('/video-sharing/create ~ Test wrong http method', async () => {
    const response = await request(app.getHttpServer())
      .get('/video-sharing/create')
      .set('Authorization', ` Bearer ${accessToken}`)
      .send({
        url: 'http://www.youtube.com/fake-no-secured-youtube',
      });
    expect(response.status).toBe(404);
  });

  it('/video-sharing/create ~ The last sharing is the same', async () => {
  });

  it('/video-sharing/create ~ Create new item successfully', async () => {
  });
});
