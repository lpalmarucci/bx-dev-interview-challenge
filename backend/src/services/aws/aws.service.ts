import { Inject, Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '@/configs/types';

@Injectable()
export class AwsService {
  s3Client: S3Client;
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    const awsConfig = this.configService.get<GlobalConfig['aws']>('aws');
    if (!awsConfig) throw new Error('AWS config missing');
    this.s3Client = new S3Client({ region: awsConfig.region });
  }
}
