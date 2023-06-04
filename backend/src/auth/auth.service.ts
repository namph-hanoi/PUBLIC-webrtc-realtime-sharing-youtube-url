import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = loginDTO;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      await this.userService.registerNewUser(loginDTO);
      return await this.login(loginDTO);
    }

    const isValidPassword = await user.validateInputPassword(password);

    if (!isValidPassword) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
