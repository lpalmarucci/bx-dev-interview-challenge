import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import getCommonConfig from './configs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app/app.service';
import { AwsService } from '@/services/aws/aws.service';
import { FileController } from '@/controllers/file/file.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [getCommonConfig] })],
  controllers: [AppController, FileController],
  providers: [AppService, AwsService],
})
export class AppModule {}
