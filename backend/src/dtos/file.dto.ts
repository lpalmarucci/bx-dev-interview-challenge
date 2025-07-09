import { Expose } from 'class-transformer';

export interface IFileDto {
  url: string;
  name: string;
}

export class FileDto implements IFileDto {
  @Expose()
  url: string;

  @Expose()
  name: string;

  constructor(url: string, name: string) {
    this.url = url;
    this.name = name;
  }
}
