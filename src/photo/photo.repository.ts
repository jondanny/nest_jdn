import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoRepository extends Repository<Photo> {
  constructor(public readonly dataSource: DataSource) {
    super(Photo, dataSource.manager);
  }
}
