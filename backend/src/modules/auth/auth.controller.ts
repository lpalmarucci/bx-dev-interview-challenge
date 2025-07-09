import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/decorators/public.decorator';
import { LoginDto, LoginResponseDto } from '@/modules/auth/auth.dto';
import { Mapper } from '@/utils/mapper/mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() payload: LoginDto): LoginResponseDto {
    const token = this.authService.login(payload);
    return Mapper.mapData(LoginResponseDto, token);
  }
}
