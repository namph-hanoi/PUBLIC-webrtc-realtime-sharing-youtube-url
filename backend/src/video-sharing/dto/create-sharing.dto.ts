import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSharingDTO {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  @Matches(/^https:\/\/www\.youtube\.com/, { message: 'Invalid youtube link' })
  url: string;
}
