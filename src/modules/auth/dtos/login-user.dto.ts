import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Username must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'Username must not exceed 50 characters',
  })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(50, {
    message: 'Password must not exceed 50 characters',
  })
  password: string;
}
