import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    // expect login function to be defined
  });

  it("Test user doesn't exist", async () => {
    // Create mockLoginPayload
    // Run the function
  });
  it('Test password mismatched', async () => {
    // Create an existing entity with userRepository
    // Run the function with same entity payload but different password
  });
  it('Test login successfully', async () => {
    // Create an existing entity with userRepository
    // Run the function with the same payload
  });
});
