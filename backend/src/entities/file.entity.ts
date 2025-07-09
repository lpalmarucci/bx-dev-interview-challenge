import { Expose } from 'class-transformer';

export interface IUploadFileEntity {
  url: string;
  name: string;
}

export class FileEntity implements IUploadFileEntity {
  @Expose()
  url: string;

  @Expose()
  name: string;

  constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
  }
}
