import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from './dto/create-user.dto';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { repositoryMockFactory } from '../utils/jestRepositoryMockFactory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('UserController should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.register).toBeDefined();
  });

  it("@Post('register') ~ Test incorrect DTO format", async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateUserDTO,
      data: 'email',
    };
    await target
      .transform(
        <CreateUserDTO>{
          email: 'namph.tech@gmail.com',
        },
        metadata,
      )
      .catch((err) => {
        expect(err.getResponse().message).toContain(
          'password must be shorter than or equal to 20 characters',
        );
      });
  });
});
