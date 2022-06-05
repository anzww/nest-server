import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ErrorResponse } from '../../utils/tools.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, mobile } = createUserDto;

    const existUser = await this.userRepo.findOne({
      where: { username },
    });
    if (existUser) {
      ErrorResponse.fail('用户名已存在', 200);
    }

    const existMobile = await this.userRepo.findOne({
      where: { mobile },
    });

    if (existMobile) {
      ErrorResponse.fail('手机号已存在', 200);
    }

    const newUser = await this.userRepo.create(createUserDto);
    const res = await this.userRepo.save(newUser);
    delete res.password;
    return res;
  }

  async login(loginDto) {
    const { username, password } = loginDto;
    const res = await this.userRepo.find({
      where: [{ username }, { mobile: username }],
    });
    if (!res.length) ErrorResponse.fail('用户不存在', 200);
    if (res[0].password !== password) ErrorResponse.fail('密码错误', 200);
    const userInfo = res[0];
    delete userInfo.password;
    return { userInfo };
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return (
      await this.userRepo.find({
        where: [{ id }],
      })
    )[0];
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
