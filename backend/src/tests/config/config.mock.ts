import type { GlobalConfig } from '@/configs/types';

export const CONFIG_MOCK: GlobalConfig = {
  port: 3000,
  jwt: {
    secret: 'test_jwt_secret',
    expiresIn: '1h',
  },
  aws: {
    bucketName: 'mock-bucket-name',
    region: 'eu-west-1',
  },
};
