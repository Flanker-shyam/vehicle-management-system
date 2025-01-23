import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { LoginDto, LoginResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { validateData } from '../helpers/validate';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authEntityRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async generateToken(username: string, isAdmin: boolean): Promise<string> {
    const payload = { username: username, isAdmin: isAdmin };
    return this.jwtService.signAsync(payload);
  }

  async loginUser(
    userData: LoginDto,
  ): Promise<LoginResponseDto | string | { error: string }> {
    await validateData(userData, LoginDto);
    try {
      const user = await this.authEntityRepository.findOne({
        where: { username: userData.username },
      });
      if (user) {
        if (user.password === userData.password) {
          const token = await this.generateToken(user.username, user.isAdmin);
          return {
            username: user.username,
            token: token,
            isAdmin: user.isAdmin,
          } as LoginResponseDto;
        } else {
          throw new UnauthorizedException('Password is incorrect');
        }
      } else {
        throw new UnauthorizedException('User not found');
      }
    } catch (err) {
      return { error: err.message };
    }
  }
}
