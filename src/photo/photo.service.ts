import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async create(queryRunner: QueryRunner, userId: number, urls: string[]): Promise<Photo[]> {
    return queryRunner.manager.save(this.photoRepository.create(urls.map((url) => ({ userId, url }))));
  }
}
