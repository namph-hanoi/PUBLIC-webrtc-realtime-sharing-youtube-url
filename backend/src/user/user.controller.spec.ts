import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('UserController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("@Post('register') ~ Test incorrect DTO format", () => {
    //  expect the class-validator to throw error 400
  });

  it("@Post('register') ~ Test exception user already exist", () => {
    // expect the user.service to throw 409
  });

  it("@Post('register') ~ Test create user success", () => {
    // expect the status code to be 201 or user.service returns some payload
  });
});
