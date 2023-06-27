import { registerAs } from '@nestjs/config';

export default registerAs('s3Config', () => ({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION || 'eu-west-1',
  bucket: process.env.BUCKET_NAME,
}));
