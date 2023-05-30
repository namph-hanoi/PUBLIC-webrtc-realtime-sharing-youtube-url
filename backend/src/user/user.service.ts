import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  //  Todo: constructor inject repository, implement like stuyy
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Todo: DTO passed from controller
  async registerNewUser(createUserDTO: CreateUserDTO) {
    const { email, password } = createUserDTO;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('User already existed', HttpStatus.CONFLICT);
    }

    const passwordSalt = await bcrypt.genSalt();
    const newUser = await new User();
    newUser.email = email;
    newUser.password = await this.hashPassword(password, passwordSalt);
    newUser.salt = passwordSalt;

    try {
      await this.userRepository.save(newUser);
      return;
    } catch (error) {
      console.error([
        '💥 ~ file: user.service.ts:34 ~ UserService ~ registerNewUser ~ error:',
        error,
      ]);
      throw new InternalServerErrorException();
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
