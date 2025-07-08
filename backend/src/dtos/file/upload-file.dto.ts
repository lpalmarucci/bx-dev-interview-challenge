import { Expose } from 'class-transformer';

export interface IUploadFileDto {
  url: string;
  key: string;
}

export class UploadFileDto implements IUploadFileDto {
  @Expose()
  url: string;

  @Expose()
  key: string;

  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
  }
}
