export type GlobalConfig = {
  port: number;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  aws: {
    region: string;
    bucketName: string;
  };
};
