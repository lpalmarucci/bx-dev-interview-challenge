import { UserEntity } from '@/entities/user.entity';

export interface IAuthService {
  validateUser(username: string, pass: string): UserEntity | null;
  login(username: string, password: string): UserEntity | null;
}
