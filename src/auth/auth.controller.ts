import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegsiterResponseDto,
} from './auth.dto';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthMiddleware)
  async registerUser(
    @Body() userData: RegisterDto,
  ): Promise<RegsiterResponseDto> {
    return this.authService.registerUser(userData);
  }

  @Post('login')
  async loginUser(@Body() userData: LoginDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(userData);
  }
}
