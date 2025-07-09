import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Module({
  providers: [AuthService],
})
export class AuthModule {}
