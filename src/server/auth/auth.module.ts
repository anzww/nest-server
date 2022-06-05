import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { JwtStorage } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

const jwtModule = JwtModule.register({
  secret: 'azw',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    jwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule],
})
export class AuthModule {}
