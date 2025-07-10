import { UserEntity } from '@/entities/user.entity';

export interface IUsersService {
  findOne(email: string): UserEntity | undefined;
}
