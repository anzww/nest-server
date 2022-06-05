import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('article-category')
export class ArticleCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '主键id' })
  id: string;

  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'category_name',
    comment: '文章类别',
  })
  categoryName: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
    comment: '删除时间',
  })
  deleteAt: Date;
}
