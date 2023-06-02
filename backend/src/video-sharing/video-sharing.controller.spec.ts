import { Test, TestingModule } from '@nestjs/testing';
import { VideoSharingController } from './video-sharing.controller';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateSharingDTO } from './dto/create-sharing.dto';
import { VideoSharingService } from './video-sharing.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../utils/jestRepositoryMockFactory';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { VideoSharing } from './video-sharing.entity';

describe('VideoSharingController', () => {
  let controller: VideoSharingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoSharingController],
      providers: [
        VideoSharingService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(VideoSharing),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<VideoSharingController>(VideoSharingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.createNewSharing).toBeDefined();
  });

  it('Test invalid validation of payload', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateSharingDTO,
      data: 'url',
    };
    await target
      .transform(
        <CreateSharingDTO>{
          url: 'http://www.youtube.com/fake-no-secured-youtube',
        },
        metadata,
      )
      .catch((err) => {
        expect(err.getResponse().message).toContain('Invalid youtube link');
      });
  });

  it('Test valid validation of payload', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateSharingDTO,
      data: 'url',
    };
    const result = await target.transform(
      <CreateSharingDTO>{
        url: 'https://www.youtube.com/real-youtube-link',
      },
      metadata,
    );
    // debugger;
    expect(result.url).toBe('https://www.youtube.com/real-youtube-link');
  });
});
