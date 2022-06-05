import { UnauthorizedException } from '@nestjs/common';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'azw',
    } as StrategyOptions);
  }

  async validate(user: User) {
    const existUser = await this.authService.getUser(user);

    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }

    return existUser;
  }
}
