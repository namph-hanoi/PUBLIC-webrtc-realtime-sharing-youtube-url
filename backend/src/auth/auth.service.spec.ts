import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import {
  MockType,
  repositoryMockFactory,
} from '../utils/jestRepositoryMockFactory';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-dto';
import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    // expect login function to be defined
    expect(service.login).toBeDefined();
  });

  it("Test user doesn't exist", async () => {
    // Create mockLoginPayload
    const mockUserPayload = {
      email: 'namph.tech@gmail.com',
      password: 'namph.tech@gmail.com',
    };
    const mockUserDTO = plainToInstance(LoginDTO, mockUserPayload);

    jest.spyOn(userRepository, 'findOne').mockImplementation(undefined);

    // Run the function
    await expect(service.login(mockUserDTO)).rejects.toThrowError(
      new HttpException('User not exists', HttpStatus.BAD_REQUEST),
    );
  });
  it('Test password mismatched', async () => {
    // Create an existing entity with userRepository
    const mockUser = new User();
    mockUser.email = 'namph.tech@gmail.com';
    mockUser.password = 'namph.tech@gmail.com';
    mockUser.validateInputPassword = jest.fn().mockReturnValue(false);
    userRepository.save(mockUser);
    await expect(
      service.login({ email: mockUser.email, password: 'anotherPassword' }),
    ).rejects.toThrowError(
      new HttpException('Wrong password', HttpStatus.BAD_REQUEST),
    );
  });
  it('Test login successfully', async () => {
    // Create an existing entity with userRepository
    // Run the function with the same payload
  });
});
