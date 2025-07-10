import { Module } from '@nestjs/common';
import { FileController } from '@/modules/file/file.controller';
import { FileService } from '@/modules/file/file.service';
import { AwsService } from '@/services/aws/aws.service';

@Module({
  controllers: [FileController],
  providers: [FileService, AwsService],
})
export class FileModule {}
