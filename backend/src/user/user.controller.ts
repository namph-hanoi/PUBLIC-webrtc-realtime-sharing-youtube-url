import { Controller, Post, Body } from '@nestjs/common';
import { Routes } from '../utils/routes';
import { UserService } from './user.service';

@Controller(Routes.USER)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body('test') postmandata: string) {
    console.log(
      '🎈 Test postmandata, inject ',
      postmandata,
      this.userService.testInject(),
    );
  }
}
