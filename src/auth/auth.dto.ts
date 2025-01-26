import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsBoolean,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(30, { message: 'Name must be at most 30 characters long' })
  name: string;

  @IsEmail({}, { message: 'username should be a valid email address' })
  username: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
  @IsBoolean()
  isAdmin: boolean;
}

export class LoginDto {
  @IsEmail({}, { message: 'username should be a valid email address' })
  username: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}

export class LoginResponseDto {
  username: string;
  isAdmin: boolean;
  token: string;
}

export class RegsiterResponseDto {
  name: string;
  username: string;
  isAdmin: boolean;
}
