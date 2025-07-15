import { IsString, MaxLength, MinLength } from 'class-validator';

export class BackupDbDto {
  @IsString()
  @MinLength(3, {
    message: 'User must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'User must not exceed 50 characters',
  })
  user: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(50, {
    message: 'Password must not exceed 50 characters',
  })
  password: string;

  @IsString()
  @MinLength(3, {
    message: 'Database name must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'Database name must not exceed 50 characters',
  })
  database: string;

  @IsString()
  host: string;
}
