import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Test exception user already exist', () => {
    // Create mockUser in the DB using userRepository
    // Create the same mockData for the payload
    // Expect the service throw error 409
  });

  it('Test create user success', () => {
    // Create a valid payload
    // Expect the service to return a payload
  });
});
