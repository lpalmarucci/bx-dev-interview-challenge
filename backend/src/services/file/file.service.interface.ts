import { FileEntity } from '@/entities/file.entity';

export interface IFileService {
  uploadFile(file: Express.Multer.File): Promise<FileEntity>;
  getUploadedFiles(): Promise<FileEntity[]>;
}
