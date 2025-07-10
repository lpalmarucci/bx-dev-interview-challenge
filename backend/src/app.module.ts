import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getCommonConfig from './configs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app/app.service';
import { AwsService } from '@/services/aws/aws.service';
import { FileController } from '@/modules/file/file.controller';
import { FileService } from './modules/file/file.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './services/users/users.service';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getCommonConfig] }),
    AuthModule,
    FileModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService, AwsService, FileService, UsersService],
})
export class AppModule {}
