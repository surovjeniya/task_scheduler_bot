import { AbstractRepositoryInterface } from '@app/common';
import { UserEntity } from '../entity/user.entity';

export interface UserRepositoryInterface
  extends AbstractRepositoryInterface<UserEntity> {}
