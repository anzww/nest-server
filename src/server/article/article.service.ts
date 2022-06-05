import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from './entities/article-category.entity';
import { ArticleEntity } from './entities/article.entity';
import {
  Repository,
  createQueryBuilder,
  getConnection,
  getRepository,
} from 'typeorm';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private readonly articleCategoryRepo: Repository<ArticleCategoryEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  /**
   *获取文章分类
   */
  getArticleCate() {
    return this.articleCategoryRepo.find({ select: ['id', 'categoryName'] });
  }
  /**
   * 建立文章分类
   * @param body
   */
  createArticleCate(body): Promise<any> {
    const { categoryName } = body;
    const categoryDto = new ArticleCategoryEntity();
    categoryDto.categoryName = categoryName;
    return this.articleCategoryRepo.save(categoryDto);
  }
  /**
   * 删除文章分类
   * @param id 文章分类id
   */
  async delArticleCate(id): Promise<string> {
    const res = await this.articleCategoryRepo.delete(id);
    if (res.affected === 1) {
      return '删除成功';
    }
    return '删除失败';
  }

  /**
   * 获取文章
   * @param id 文章id
   */
  getArticle(id) {
    // 利用leftJoinAndMapOne方法进行左联查询
    // 两个未关联的实体，经过getRawMany获取原始查询数据
    if (id) {
      return createQueryBuilder(ArticleEntity, 'article')
        .leftJoinAndMapOne(
          'article.cate_name',
          ArticleCategoryEntity,
          'cate',
          'cate.id = article.category_id',
        )
        .where('article.id = :id', { id })
        .select(['article.*', 'cate.category_name'])
        .getRawMany(); // 得到原始结果
    } else {
      return createQueryBuilder(ArticleEntity, 'article')
        .leftJoinAndMapOne(
          'article.cate_name',
          ArticleCategoryEntity,
          'cate',
          'cate.id = article.category_id',
        )
        .getRawMany(); // 得到原始结果
    }
  }
  /**
   * 建立文章
   * @param body
   */
  createArticle(body) {
    const articleEntity = this.articleRepo.create(body);
    return this.articleRepo.save(articleEntity);
  }

  /**
   * 更新文章
   * @param id
   * @param body
   */
  updateArticle(id, body) {
    return this.articleRepo.update(id, body);
  }

  /**
   * 删除文章
   * @param id 文章ID
   */
  delArticle(id) {
    return this.articleRepo.delete(id);
  }
}
