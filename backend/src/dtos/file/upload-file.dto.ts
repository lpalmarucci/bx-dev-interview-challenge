import { Expose } from 'class-transformer';

export interface IUploadFileDto {
  url: string;
}

export class UploadFileDto implements IUploadFileDto {
  @Expose()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
