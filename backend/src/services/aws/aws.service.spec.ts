import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MOCK } from '@/tests/config/config.mock';

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(() => CONFIG_MOCK)],
      providers: [AwsService],
    }).compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
