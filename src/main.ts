import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModifyInterceptor } from './common/modify.interceptor';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.useGlobalInterceptors(new ModifyInterceptor());
  await app.useGlobalFilters(new HttpExceptionFilter());
  await app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static/' });
  const config = new DocumentBuilder()
    .setTitle('社区')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(8000);
}
bootstrap().then(() => null);
