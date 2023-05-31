import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
