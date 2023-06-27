import { Inject, Injectable } from '@nestjs/common';
import { S3_PROVIDER_TOKEN } from './s3.types';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private bucket: string;

  constructor(private readonly configService: ConfigService, @Inject(S3_PROVIDER_TOKEN) public s3) {
    this.bucket = configService.get('s3Config').bucket;
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadedFiles: string[] = [];

    for (const file of files) {
      const result = await this.uploadFile(file);
      uploadedFiles.push(result.Location);
    }

    return uploadedFiles;
  }

  private async uploadFile(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const uploadParams = {
      Bucket: this.bucket,
      Key: `${uuid()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    return this.s3.upload(uploadParams).promise();
  }
}
