import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async findByUserId(userId: number): Promise<string[]> {
    return (await this.photoRepository.find({ where: { userId } })).map(({ url }) => url);
  }

  async create(queryRunner: QueryRunner, userId: number, urls: string[]): Promise<Photo[]> {
    return queryRunner.manager.save(this.photoRepository.create(urls.map((url) => ({ userId, url }))));
  }
}
