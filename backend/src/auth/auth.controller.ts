import { Routes } from '../utils/routes';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('check-login')
  @UseGuards(AuthGuard('jwt'))
  checkNgon() {
    return 'OK';
  }
}
