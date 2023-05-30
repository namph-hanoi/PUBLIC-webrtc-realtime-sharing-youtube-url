import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Routes } from '../utils/routes';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller(Routes.USER)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    return this.userService.registerNewUser(createUserDTO);
  }
}
