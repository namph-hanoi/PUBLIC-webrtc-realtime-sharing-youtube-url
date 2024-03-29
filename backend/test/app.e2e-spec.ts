import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../src/user/user.entity';
import { VideoSharing } from '../src/video-sharing/video-sharing.entity';
import { entities } from '../src/app.entity';

export const typeormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities,
  logging: false,
};

export const appDataSource = new DataSource(typeormConfig);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await appDataSource.initialize();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('All repositories to be defined', () => {
    const userRepo = appDataSource.getRepository(User);
    const videoSharingRepo = appDataSource.getRepository(VideoSharing);
    expect(userRepo).toBeDefined();
    expect(videoSharingRepo).toBeDefined();
  });
});
