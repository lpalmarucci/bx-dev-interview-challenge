import type { GlobalConfig } from '@/configs/types';

export const CONFIG_MOCK: GlobalConfig = {
  port: 3000,
  aws: {
    bucketName: 'mock-bucket-name',
    region: 'eu-west-1',
  },
};
