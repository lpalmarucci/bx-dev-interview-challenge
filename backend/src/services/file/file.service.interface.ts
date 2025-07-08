import { UploadFileEntity } from '@/entities/file/upload-file.entity';

export interface IFileService {
  uploadFile(file: Express.Multer.File): Promise<UploadFileEntity>;
}
