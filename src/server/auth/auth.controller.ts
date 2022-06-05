import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    const token = await this.authService.login(req.user);
    return { userInfo: req.user, token };
  }
}
