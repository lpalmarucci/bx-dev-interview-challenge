import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/entities/user.entity';
import { IUsersService } from '@/services/users/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  users: UserEntity[] = [
    {
      id: 1,
      email: 'test@gmail.com',
      password: 'test',
    },
  ];

  findOne(email: string): UserEntity | undefined {
    const user = this.users.find((u) => u.email === email);
    if (!user) return;
    return new UserEntity(user.id, user.email, user.password);
  }
}
