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
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: MockType<Repository<User>>;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get(getRepositoryToken(User));
    userService = module.get<UserService>(UserService);
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
    let recursiveCallCount = 1;
    jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
      if (recursiveCallCount === 1) {
        // Get no user in the first call
        recursiveCallCount += 1;
        return undefined;
      }

      return {
        ...mockUserPayload,
        validateInputPassword: jest.fn().mockReturnValue(true),
      };
    });
    jest.spyOn(userService, 'registerNewUser').mockImplementation(undefined);
    jest.spyOn(jwtService, 'sign').mockReturnValue('github:namph-hanoi');
    const response = await service.login(mockUserDTO);
    // Run the function
    expect(response).toHaveProperty('accessToken');
  });
  it('Test password mismatched', async () => {
    // Create an existing entity with userRepository
    const mockUser = new User();
    mockUser.email = 'namph.tech@gmail.com';
    mockUser.password = 'namph.tech@gmail.com';
    // mockUser.validateInputPassword = jest.fn().mockReturnValue(false);
    userRepository.save(mockUser);
    await expect(
      service.login({
        email: mockUser.email,
        password: 'caseIncorrectPassword',
      }),
    ).rejects.toThrowError(
      new HttpException('Wrong password', HttpStatus.BAD_REQUEST),
    );
  });
  it('Test login successfully', async () => {
    // Create an existing entity with userRepository
    // Run the function with the same payload
    const mockUser = new User();
    mockUser.email = 'namph.tech@gmail.com';
    mockUser.password = 'namph.tech@gmail.com';
    mockUser.validateInputPassword = jest.fn().mockReturnValue(true);
    userRepository.save(mockUser);
    jest.spyOn(userRepository, 'findOne').mockReturnValue(mockUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('github:namph-hanoi');

    const loginResult = await service.login({
      email: mockUser.email,
      password: mockUser.password,
    });
    expect(loginResult.accessToken).toBe('github:namph-hanoi');
  });
});
