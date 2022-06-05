import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticleCategoryEntity } from './entities/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleCategoryEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
