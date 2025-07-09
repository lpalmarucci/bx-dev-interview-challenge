export interface IAwsService {
  uploadFile(file: Express.Multer.File): Promise<unknown>;
}
