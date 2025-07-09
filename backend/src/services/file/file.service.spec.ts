import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { AwsService } from '@/services/aws/aws.service';
import { CONFIG_MOCK } from '@/tests/config/config.mock';
import { ConfigModule } from '@nestjs/config';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(() => CONFIG_MOCK)],
      providers: [FileService, AwsService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
