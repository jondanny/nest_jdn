import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findOne(param: any): Promise<Client> {
    return this.clientRepository.findOne({ where: param });
  }

  async create(queryRunner: QueryRunner, body: Partial<Client>): Promise<Client> {
    return queryRunner.manager.save(this.clientRepository.create(body));
  }
}
