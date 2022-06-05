import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorResponse } from '../../utils/tools.service';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username or user.mobile=:username', { username })
      .getOne();

    if (!user) {
      ErrorResponse.fail('用户不存在', 200);
    }

    if (!compareSync(password, user.password)) {
      ErrorResponse.fail('密码错误', 200);
    }

    delete user.password;
    return user;
  }
}
