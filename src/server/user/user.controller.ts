import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NoAuth } from '../../common/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import multer = require('multer');
import { ErrorResponse } from '../../utils/tools.service';

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

  // todo pending completed
  @Post('upload/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          // cb(null, join(process.cwd(), 'upload'));
          cb(null, join(process.cwd(), 'public'));
        },
        filename: function (req, file, cb) {
          const unique = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
          const imgPath = `${unique}.${file.mimetype.split('/')[1]}`;
          cb(null, imgPath);
        },
      }),
      limits: {
        fileSize: 1024 * 1024,
      },
      fileFilter(req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          ErrorResponse.fail(`只支持jpg, png格式`, 200);
        }
        cb(null, true);
      },
    }),
  )
  async coverImport(@UploadedFile() file) {
    console.log(file);
    return { url: `/static/${file.filename}` };
  }
}
