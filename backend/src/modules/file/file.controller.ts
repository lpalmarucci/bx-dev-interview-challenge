import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@/modules/file/file.service';
import { FileDto } from '@/modules/file/dto/file.dto';
import { Mapper } from '@/utils/mapper/mapper';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 })
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .build(),
    )
    file: Express.Multer.File,
  ): Promise<FileDto> {
    const fileEntity = await this.fileService.uploadFile(file);
    return Mapper.mapData(FileDto, fileEntity);
  }

  @Get('list')
  async getUploadedFiles(): Promise<FileDto[]> {
    const files = await this.fileService.getUploadedFiles();
    return Mapper.mapArrayData(FileDto, files);
  }
}
