import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(
    @Body() userData: LoginDto,
  ): Promise<LoginResponseDto | string | { error: string }> {
    return this.authService.loginUser(userData);
  }
}
