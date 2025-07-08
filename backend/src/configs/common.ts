import { GlobalConfig } from '@/configs/types';

function getCommonConfig(): GlobalConfig {
  return {
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
    aws: {
      region: process.env.AWS_REGION!,
      keyId: process.env.AWS_ACCESS_KEY_ID!,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY!,
      bucketName: process.env.S3_BUCKET_NAME!,
    },
  };
}

export default getCommonConfig;
