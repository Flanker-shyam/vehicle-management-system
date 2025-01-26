import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegsiterResponseDto,
} from './auth.dto';
import { AdminAuthMiddleware } from '../middlewares/admin-auth.middleware';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBearerAuth()
  @ApiBody({ type: RegisterDto, description: 'only admin can register users' })
  @ApiResponse({
    type: RegsiterResponseDto,
    status: 201,
    description: 'User registered successfully',
  })
  @UseGuards(AdminAuthMiddleware)
  async registerUser(
    @Body() userData: RegisterDto,
  ): Promise<RegsiterResponseDto> {
    return this.authService.registerUser(userData);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    type: LoginResponseDto,
    status: 200,
    description: 'Login successful',
  })
  async loginUser(@Body() userData: LoginDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(userData);
  }
}
