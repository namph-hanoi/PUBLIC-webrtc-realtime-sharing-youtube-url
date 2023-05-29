import { Test, TestingModule } from '@nestjs/testing';
import { User, User as UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserEntity', () => {
  let entity: UserEntity;
  let userRepository: Repository<User>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
            insert: jest.fn(),
          },
      }
      ]
    }).compile();

    // service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  // Todo: test load video-sharing property
});
