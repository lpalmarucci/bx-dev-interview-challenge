export type GlobalConfig = {
  port: number;
  aws: {
    region: string;
    keyId: string;
    secretKey: string;
    bucketName: string;
  };
};
