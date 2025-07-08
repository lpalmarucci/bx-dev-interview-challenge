import { Expose } from 'class-transformer';

export interface IUploadFileEntity {
  url: string;
  key: string;
}

export class UploadFileEntity implements IUploadFileEntity {
  @Expose()
  url: string;

  @Expose()
  key: string;

  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
  }
}
