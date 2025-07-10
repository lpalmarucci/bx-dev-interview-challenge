import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from '@/modules/file/file.service';
import { AwsService } from '@/services/aws/aws.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MOCK } from '@/tests/config/config.mock';

describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(() => CONFIG_MOCK)],
      controllers: [FileController],
      providers: [FileService, AwsService],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
