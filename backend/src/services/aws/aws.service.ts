import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import type { GlobalConfig } from '@/configs/types';
import type { IAwsService } from '@/services/aws/aws.service.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileEntity } from '@/entities/file.entity';

@Injectable()
export class AwsService implements IAwsService {
  private readonly _bucketName: string;
  private readonly _s3Client: S3Client;
  private readonly logger = new Logger(AwsService.name);

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    const awsConfig = this.configService.get<GlobalConfig['aws']>('aws');
    if (!awsConfig) throw new Error('AWS config missing');
    this._bucketName = awsConfig.bucketName;
    this._s3Client = new S3Client({ region: awsConfig.region });
  }

  async uploadFile(file: Express.Multer.File): Promise<FileEntity> {
    try {
      this.logger.log(`Requesting upload for file ${file.originalname}...`);
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

      const res = await this._s3Client.send(command);

      this.logger.log(`File ${file.originalname} uploaded successfully`);
      const presignedUrl = await this._getPresignedSignedUrl(file.originalname);
      return new FileEntity(presignedUrl, file.originalname, res.Size ?? 0);
    } catch (e) {
      this.logger.error(`Error while uploading ${file.originalname}: `, e);
      throw new InternalServerErrorException(e);
    }
  }

  async getFilesInBucket(): Promise<FileEntity[]> {
    try {
      this.logger.log(`Getting files from aws s3 bucket ${this._bucketName}`);
      const listObjectCommand = new ListObjectsCommand({
        Bucket: this._bucketName,
      });

      const objectResponse = await this._s3Client.send(listObjectCommand);

      if (!objectResponse.Contents) return [];

      const filePromises = objectResponse.Contents.map(async (content) => {
        const fileName = content.Key;
        if (!fileName) return;

        const signedUrl = await this._getPresignedSignedUrl(fileName);
        return new FileEntity(
          signedUrl,
          fileName,
          content.Size ?? 0,
          content.LastModified,
        );
      });

      const promisesResult = await Promise.all(filePromises);
      return promisesResult.filter((f) => !!f);
    } catch (e) {
      this.logger.error('Error while getting files from aws s3 bucket', e);
      throw new InternalServerErrorException(e);
    }
  }

  private async _getPresignedSignedUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this._bucketName,
        Key: key,
        ResponseContentDisposition: `attachment; filename="${key}"`,
      });

      return getSignedUrl(this._s3Client, command, {
        expiresIn: 60 * 60, // 1 Hour
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
