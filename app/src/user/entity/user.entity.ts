import { Column, Entity } from 'typeorm';
import { UserModel } from '../model/user.model';
import { BaseEntity } from '@app/common';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements UserModel {
  @Column({})
  telegram_id: number;
  @Column({})
  is_bot: boolean;
  @Column({ nullable: true })
  first_name?: string;
  @Column({ nullable: true })
  username?: string;
  @Column({ nullable: true })
  language_code?: string;
}
