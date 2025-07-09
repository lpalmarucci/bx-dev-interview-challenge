import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getCommonConfig from './configs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app/app.service';
import { AwsService } from '@/services/aws/aws.service';
import { FileController } from '@/controllers/file/file.controller';
import { FileService } from './services/file/file.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [getCommonConfig] }), AuthModule],
  controllers: [AppController, FileController],
  providers: [AppService, AwsService, FileService],
})
export class AppModule {}
