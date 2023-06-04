import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './dto/login-dto';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../utils/jestRepositoryMockFactory';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.login).toBeDefined();
  });

  it('Test payload mismatches DTO', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: LoginDTO,
      data: 'email',
    };
    await target
      .transform(
        <LoginDTO>{
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

  it('Test payload matches DTO', async () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: LoginDTO,
      data: 'email',
    };
    const result = await target.transform(
      <LoginDTO>{
        email: 'namph.tech@gmail.com',
        password: 'namph.tech@gmail.com',
      },
      metadata,
    );
    expect(result.email).toBe('namph.tech@gmail.com');
  });
});
