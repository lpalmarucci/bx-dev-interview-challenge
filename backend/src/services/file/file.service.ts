import { Injectable } from '@nestjs/common';
import { AwsService } from '@/services/aws/aws.service';
import type { IFileService } from '@/services/file/file.service.interface';

@Injectable()
export class FileService implements IFileService {
  constructor(private awsService: AwsService) {}

  uploadFile(file: Express.Multer.File) {
    return this.awsService.uploadFile(file);
  }
}
