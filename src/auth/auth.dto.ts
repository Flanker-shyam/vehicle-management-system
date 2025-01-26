import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Name of the user',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(30, { message: 'Name must be at most 30 characters long' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Username (email address) of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'username should be a valid email address' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password (email address) of the user',
    example: 'string',
    minLength: 8,
  })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Whether the user is an admin',
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}

export class LoginDto {
  @ApiProperty({
    description: 'Username (email address) of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'username should be a valid email address' })
  @IsNotEmpty()
  username: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @ApiProperty({
    description: 'Password (email address) of the user',
    example: 'string',
  })
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'username',
    example: 'random12@gmail.com',
  })
  username: string;
  @ApiProperty({
    description: 'True if Admin',
    example: true,
  })
  isAdmin: boolean;
  @ApiProperty({
    description: 'Auth Token to be used',
  })
  token: string;
}

export class RegsiterResponseDto {
  @ApiProperty({
    description: 'name of user',
    example: 'string',
  })
  name: string;
  @ApiProperty({
    description: 'username',
    example: 'random12@gmail.com',
  })
  username: string;
  @ApiProperty({
    description: 'True if Admin',
    example: true,
  })
  isAdmin: boolean;
}
