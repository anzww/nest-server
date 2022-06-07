import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NoAuth } from '../../common/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { ErrorResponse } from '../../utils/tools.service';
import { createWriteStream } from 'fs';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @NoAuth()
  @ApiOperation({ summary: '注册' })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async coverImport(@UploadedFile() file, @Req() req) {
    console.log('user', req.user);
    const writeImage = createWriteStream(
      join(__dirname, '..', '../../public/', `${file.originalname}`),
    );
    writeImage.write(file.buffer);
    const user = req.user;
    user.avatar = `/static/${file.originalname}`;
    await this.userService.updateAvatar(user); // 更新db字段

    return { url: `/static/${file.originalname}` };
  }
}
