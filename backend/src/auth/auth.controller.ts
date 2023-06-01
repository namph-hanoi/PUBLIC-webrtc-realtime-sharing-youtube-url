import { Routes } from '../utils/routes';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('check-protected-route')
  @UseGuards(AuthGuard('jwt'))
  checkGuard() {
    return 'OK';
  }
}
