import { FileEntity } from '@/entities/file.entity';

export interface IAwsService {
  uploadFile(file: Express.Multer.File): Promise<FileEntity>;
  getFilesInBucket(): Promise<FileEntity[]>;
}
