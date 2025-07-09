import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/services/users/users.service';
import { UserEntity } from '@/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): UserEntity | null {
    const user = this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
