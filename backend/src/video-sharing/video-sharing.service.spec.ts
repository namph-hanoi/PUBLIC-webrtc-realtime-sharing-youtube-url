import { Test, TestingModule } from '@nestjs/testing';
import { VideoSharingService } from './video-sharing.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockType,
  sharingRepositoryMockFactory as repositoryMockFactory,
} from '../utils/jestRepositoryMockFactory';
import { VideoSharing } from './video-sharing.entity';
import { Repository } from 'typeorm';

describe('VideoSharingService', () => {
  let service: VideoSharingService;
  let videoSharingRepository: MockType<Repository<VideoSharing>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoSharingService,
        {
          provide: getRepositoryToken(VideoSharing),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<VideoSharingService>(VideoSharingService);
    videoSharingRepository = module.get(getRepositoryToken(VideoSharing));
  });

  it('VideoSharingService should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('Test case fail calling Youtube API', async () => {
    jest.spyOn(service, 'executeWget').mockImplementation(() => {
      throw new Error('Random error from Youtube');
    });

    const newSharingDTO = {
      url: 'https://www.youtube.com/watch?v=-4rfUS9fCEw',
    };
    const user = new User();
    try {
      await service.createNewSharing(newSharingDTO, user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Fail fetching youtube page');
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
    }

    //
  });

  it('Test created item successfully', async () => {
    const mockSharing = {
      owner: {}, // Mock owner object
      link: 'https://example.com/video',
      thumbnail_link: 'https://example.com/thumbnail',
      title: 'Video Title',
      description: 'Video Description',
    };
    // jest.spyOn(videoSharingRepository).mockReturnValue(mockSharing);
    jest.spyOn(videoSharingRepository, 'create').mockReturnValue(mockSharing);
    const newSharingDTO = {
      url: 'https://www.youtube.com/watch?v=-4rfUS9fCEw',
    };
    const user = new User();
    user.id = 1;
    user.email = 'namph.tech@gmail.com';
    // user.

    const result = await service.createNewSharing(newSharingDTO, user);
    expect(result).toHaveProperty('thumbnail_link');
    expect(result).toHaveProperty('title');
  });

  it('Test get all sharing successfully', async () => {
    const result = await service.getAllSharing();
    expect(result[0]).toHaveProperty('link');
    expect(result[0]).toHaveProperty('id');
  });
});
