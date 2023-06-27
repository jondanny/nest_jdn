import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { S3_PROVIDER_TOKEN } from './s3.types';

export const S3Provider = {
  provide: S3_PROVIDER_TOKEN,
  useFactory: async (configService: ConfigService): Promise<AWS.S3> =>
    new AWS.S3({
      accessKeyId: configService.get('s3Config').accessKeyId,
      secretAccessKey: configService.get('s3Config').secretAccessKey,
      region: configService.get('s3Config').region,
    }),
  inject: [ConfigService],
};
