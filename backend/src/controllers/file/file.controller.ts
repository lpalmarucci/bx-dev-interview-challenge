import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@/services/file/file.service';
import { FileDto } from '@/dtos/file.dto';
import { Mapper } from '@/utils/mapper/mapper';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 100 })
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const fileEntity = await this.fileService.uploadFile(file);
    return Mapper.mapData(FileDto, fileEntity);
  }
}
