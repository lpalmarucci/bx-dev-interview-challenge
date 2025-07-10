import { GlobalConfig } from '@/configs/types';

function getCommonConfig(): GlobalConfig {
  return {
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
    jwt: {
      secret: process.env.JWT_SECRET_KEY ?? '',
      expiresIn: process.env.JWT_EXPIRES_IN ?? '',
    },
    aws: {
      region: process.env.AWS_REGION ?? '',
      bucketName: process.env.S3_BUCKET_NAME ?? '',
    },
  };
}

export default getCommonConfig;
