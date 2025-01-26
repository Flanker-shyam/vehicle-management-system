import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegsiterResponseDto,
} from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { validateData } from '../helpers/validate';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async registerUser(userData: RegisterDto): Promise<RegsiterResponseDto> {
    try {
      const user = await this.authRepository.findOne({
        where: { username: userData.username },
      });
      if (user) {
        throw new ConflictException(
          `User with this email or username already exists`,
        );
      } else {
        const newUser = new Auth();
        newUser.name = userData.name;
        newUser.username = userData.username;
        newUser.password = userData.password;
        newUser.is_admin = userData.isAdmin;
        await this.authRepository.save(userData);
        return {
          name: newUser.name,
          username: newUser.username,
          isAdmin: newUser.is_admin,
        } as RegsiterResponseDto;
      }
    } catch (err) {
      throw new Error(`Internal server error: ${err}`);
    }
  }

  async generateToken(username: string, isAdmin: boolean): Promise<string> {
    const payload = { username: username, isAdmin: isAdmin };
    return this.jwtService.signAsync(payload);
  }

  async loginUser(userData: LoginDto): Promise<LoginResponseDto> {
    await validateData(userData, LoginDto);
    try {
      const user = await this.authRepository.findOne({
        where: { username: userData.username },
      });
      if (user) {
        if (user.password === userData.password) {
          const token = await this.generateToken(user.username, user.is_admin);
          return {
            username: user.username,
            token: token,
            isAdmin: user.is_admin,
          } as LoginResponseDto;
        } else {
          throw new UnauthorizedException('Password is incorrect');
        }
      } else {
        throw new UnauthorizedException('User not found');
      }
    } catch (err) {
      throw new Error(`Internal server error: ${err}`);
    }
  }
}
