import { Test, TestingModule } from '@nestjs/testing';
import { VideoSharing } from './video-sharing.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

describe('UserEntity', () => {
  let videoSharingRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(VideoSharing),
          useValue: {
            find: jest.fn(),
            insert: jest.fn(),
          },
        },
      ],
    }).compile();

    // service = module.get<UserService>(UserService);
    videoSharingRepository = module.get(getRepositoryToken(VideoSharing));
  });

  it('UserEntity should be defined', () => {
    expect(videoSharingRepository).toBeDefined();
  });

  it('UserEntity should have the property sharing', () => {
    const mockUser = new User();
    const mockSharing = new VideoSharing();
    mockSharing.owner = mockUser;
    mockUser.sharing = [mockSharing];
    expect(mockSharing).toHaveProperty('owner');
    expect(mockSharing.owner).toMatchObject(mockUser);
  });
});
