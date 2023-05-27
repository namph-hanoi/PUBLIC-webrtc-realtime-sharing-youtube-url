import { Routes } from '../../utils/routes';
import { Controller, Post } from '@nestjs/common';

@Controller(Routes.AUTH)
export class AuthController {
  // constructor() {}

  @Post('register')
  async register() {
    console.log('rergister');
    return 'connected /register';
  }
}
