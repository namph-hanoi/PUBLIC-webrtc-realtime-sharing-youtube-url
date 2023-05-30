import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
  }),
);

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.registerNewUser).toBeDefined();
  });

  it('Test exception user already exist', () => {
    // Create mockUser in the DB using userRepository
    const mockUser = new User();
    mockUser.email = 'namph.tech@gmail.com';
    userRepository.save(mockUser);
    // Create the same mockData for the payload
    expect(
      service.registerNewUser({
        email: 'namph.tech@gmail.com',
      } as CreateUserDTO),
      // Expect the service throw error 409
    ).rejects.toThrowError(
      new HttpException('User already existed', HttpStatus.CONFLICT),
    );
  });

  it('Test create user success', async () => {
    // Create a valid payload
    const mockUserPayload = {
      email: 'namph.tech@gmail.com',
      password: 'namph.tech@gmail.com',
    };
    const mockUserDTO = plainToInstance(CreateUserDTO, mockUserPayload);

    // Stub the repository.findOne
    jest.spyOn(userRepository, 'findOne').mockImplementation(undefined);

    // Expect the service to return a payload
    await expect(service.registerNewUser(mockUserDTO)).resolves.toBeUndefined();
  });
});
