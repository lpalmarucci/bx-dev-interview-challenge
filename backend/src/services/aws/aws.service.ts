import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import type { GlobalConfig } from '@/configs/types';
import type { IAwsService } from '@/services/aws/aws.service.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UploadFileEntity } from '@/entities/file/upload-file.entity';

@Injectable()
export class AwsService implements IAwsService {
  private readonly _bucketName: string;
  private readonly _s3Client: S3Client;
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    const awsConfig = this.configService.get<GlobalConfig['aws']>('aws');
    if (!awsConfig) throw new Error('AWS config missing');
    this._bucketName = awsConfig.bucketName;
    this._s3Client = new S3Client({ region: awsConfig.region });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadFileEntity> {
    try {
      const key = crypto.randomUUID();
      const bucketName = this.configService.get<string>('aws.bucketName');
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
        Metadata: {
          originalName: file.originalname,
        },
      });

      await this._s3Client.send(command);

      const presignedUrl = await this._getPresignedSignedUrl(key);

      return new UploadFileEntity(presignedUrl);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async _getPresignedSignedUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this._bucketName,
        Key: key,
      });

      return getSignedUrl(this._s3Client, command, {
        expiresIn: 60 * 60 * 24, // 24 hours
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
