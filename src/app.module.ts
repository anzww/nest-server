import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './server/article/article.module';
import { UserModule } from './server/user/user.module';
import { AuthModule } from './server/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleAuthGuard } from './server/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'community',
        timezone: 'UTC',
        charset: 'utf8mb4',
        entities: ['./**/*.entity.js'],
        synchronize: true,
        logging: true,
      }),
    }),
    ArticleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RoleAuthGuard }],
})
export class AppModule {}
