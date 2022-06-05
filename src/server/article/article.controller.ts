import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('createArticleCate')
  createArticleCate(@Body() body) {
    return this.articleService.createArticleCate(body);
  }

  @Get('cate')
  getArticleCate() {
    return this.articleService.getArticleCate();
  }

  @Delete('cate/:id')
  delArticleCate(@Param('id') id: string) {
    return this.articleService.delArticleCate(id);
  }
}
