import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]), // Import and provide the AuthEntity to TypeOrmModule
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration (optional)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Remove AuthEntity from providers
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware).forRoutes('auth/register');
  }
}
