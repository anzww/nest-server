import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    comment: '文章标题',
  })
  title: string;

  @Column('varchar', {
    nullable: false,
    comment: '文章内容',
  })
  content: string;

  @Column({ nullable: false, name: 'category_id', comment: '文章类别' })
  categoryId: string;

  @Column('varchar', { nullable: true, comment: '文章简介' })
  intro: string;

  @Column('varchar', { nullable: true, comment: '文章标签' })
  tags: string;

  @Column('enum', {
    nullable: false,
    default: 0,
    enum: [0, 1, 2],
    comment: '文章状态，0：审核中，1：已发布，2：不可用',
  })
  status: number;

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
