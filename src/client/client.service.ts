import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findOne(param: any): Promise<Client> {
    return this.clientRepository.findOne({ where: param });
  }

  async create(body: Partial<Client>): Promise<Client> {
    const client = await this.clientRepository.save(this.clientRepository.create(body));

    return client;
  }
}
