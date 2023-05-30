import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoSharing } from '../video-sharing/video-sharing.entity';

describe('UserEntity', () => {
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            insert: jest.fn(),
          },
        },
      ],
    }).compile();

    // service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('UserEntity should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('UserEntity should have the property sharing', () => {
    const mockUser = new User();
    const mockSharing = new VideoSharing();
    mockSharing.owner = mockUser;
    mockUser.sharing = [mockSharing];
    expect(mockUser).toHaveProperty('sharing');
    expect(mockUser.sharing[0]).toMatchObject(mockSharing);
  });

  it('Test UserEntity runs validation function', () => {
    
  });
});
