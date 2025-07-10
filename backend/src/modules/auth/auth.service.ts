import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/services/users/users.service';
import { UserEntity } from '@/entities/user.entity';
import { LoginDto } from '@/modules/auth/auth.dto';
import { JwtPayload } from '@/modules/auth/auth.types';

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

  login(userDto: LoginDto) {
    const user = this.validateUser(userDto.email, userDto.password);
    if (!user) throw new BadRequestException('Invalid email or password');
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
