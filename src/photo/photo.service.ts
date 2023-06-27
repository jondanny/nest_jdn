import { Injectable } from '@nestjs/common';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async create(userId: number, urls: string[]): Promise<Photo[]> {
    const photoEntities = this.photoRepository.create(urls.map((url) => ({ userId, url })));

    return this.photoRepository.save(photoEntities);
  }
}
