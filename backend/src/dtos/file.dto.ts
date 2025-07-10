export interface IFileDto {
  url: string;
  name: string;
  size: number;
  lastModified: Date;
}

export class FileDto implements IFileDto {
  url: string;

  name: string;

  size: number;

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
