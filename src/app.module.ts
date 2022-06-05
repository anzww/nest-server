import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './server/article/article.module';
import { UserModule } from './server/user/user.module';
import { AuthModule } from './server/auth/auth.module';

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
  providers: [AppService],
})
export class AppModule {}
