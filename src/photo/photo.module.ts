import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoRepository } from './photo.repository';

@Module({
  providers: [PhotoService, PhotoRepository],
  exports: [PhotoService],
})
export class PhotoModule {}
