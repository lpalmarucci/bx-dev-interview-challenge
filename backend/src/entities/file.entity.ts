import { Expose } from 'class-transformer';

export interface IUploadFileEntity {
  url: string;
  name: string;
  size: number;
  lastModified: Date;
}

export class FileEntity implements IUploadFileEntity {
  @Expose()
  url: string;

  @Expose()
  name: string;

  @Expose()
  size: number;

  @Expose()
  lastModified: Date;

  constructor(
    url: string,
    name: string,
    size: number,
    lastModified: Date = new Date(),
  ) {
    this.url = url;
    this.name = name;
    this.size = size;
    this.lastModified = lastModified;
  }
}
