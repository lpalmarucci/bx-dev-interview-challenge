import { Injectable } from '@nestjs/common';
import { AwsService } from '@/services/aws/aws.service';
import type { IFileService } from '@/modules/file/file.service.interface';
import { FileEntity } from '@/modules/file/file.entity';

@Injectable()
export class FileService implements IFileService {
  constructor(private awsService: AwsService) {}

  uploadFile(file: Express.Multer.File) {
    return this.awsService.uploadFile(file);
  }

  getUploadedFiles(): Promise<FileEntity[]> {
    return this.awsService.getFilesInBucket();
  }
}
