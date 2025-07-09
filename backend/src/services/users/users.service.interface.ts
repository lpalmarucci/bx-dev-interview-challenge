import { UserEntity } from '@/entities/user/user.entity';

export interface IUsersService {
  findOne(email: string): UserEntity | undefined;
}
