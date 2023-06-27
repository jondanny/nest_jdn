import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateClientDto } from './dto/create-user.dto';
import { S3Service } from 'src/s3/s3.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
    private readonly clientService: ClientService,
  ) {}

  async findOne(param: any): Promise<User> {
    return this.userRepository.findOne({ where: param });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(body: CreateClientDto, files: Express.Multer.File[]): Promise<void> {
    const queryRunner = this.userRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.userRepository.save(
        this.userRepository.create({
          firstName: body.firstName,
          lastName: body.lastName,
          fullName: `${body.firstName} ${body.lastName}`,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
          role: body.role,
          active: true,
        }),
      );

      // Upload images to S3
      const urls = await this.s3Service.uploadFiles(files);

      await this.clientService.create({
        userId: user.id,
        avatar: urls[0],
        photos: urls,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback user record creation in case image upload fails
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}