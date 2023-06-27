import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Provider } from './s3.provider';

@Module({
  providers: [S3Service, S3Provider],
  exports: [S3Service],
})
export class S3Module {}
