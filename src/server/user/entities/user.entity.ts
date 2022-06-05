import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    comment: '用户名',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    comment: '密码',
  })
  password: string;

  @Column('varchar', {
    nullable: false,
    comment: '手机号',
  })
  mobile: string;

  @Column('varchar', {
    nullable: false,
    comment: '邮箱',
  })
  email: string;

  @Column('varchar', {
    nullable: true,
    comment: '昵称',
  })
  nickname: string;

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

  @BeforeInsert()
  async hashPassword() {
    // 密码加密
    this.password = await hashSync(this.password);
  }
}
