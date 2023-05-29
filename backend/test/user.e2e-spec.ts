import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from 'src/user/user.module';

describe('For Route /user... (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/register ~ Test incorrect DTO format', () => {
    // Create incorrect format payload
    //
    // return request(app.getHttpServer())
    //   .post('/user/register')
    //   .send({payload})
    //   .expect(403 or 40smt)
    //   .expect(response.text.includes('email should be at least 20 characters long'))
  });

  it('/user/register ~ Test wrong http method', () => {
    // return request(app.getHttpServer())
    //   .get('/user/register')
    //   .expect(404)
  });

  it('/user/register ~ Test exception user already existed', () => {
    // Create mockUser in the DB using userRepository
    // Create the same mockData for the payload
    //
    // return request(app.getHttpServer())
    //   .post('/user/register')
    //   .send({payload})
    //   .expect(403 or 40smt)
    //   .expect(response.text.includes('User already exists'))
  });

  it('/user/register ~ Test create user success', () => {
    // Create a valid payload
    //
    // return request(app.getHttpServer())
    //   .post('/user/register')
    //   .send({payload})
    //   .expect(201)
    //   .expect(response.text.includes('User created'))
  });
});
