import { Expose } from 'class-transformer';

export interface IUploadFileEntity {
  url: string;
}

export class UploadFileEntity implements IUploadFileEntity {
  @Expose()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
