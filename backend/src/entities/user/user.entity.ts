import { Exclude, Expose } from 'class-transformer';

export interface IUserEntity {
  id: number;
  email: string;
  password: string;
}

export class UserEntity implements IUserEntity {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
