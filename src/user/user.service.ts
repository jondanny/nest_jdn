import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateClientDto } from './dto/create-user.dto';
import { S3Service } from 'src/s3/s3.service';
import { ClientService } from 'src/client/client.service';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
    private readonly clientService: ClientService,
    private readonly photoService: PhotoService,
  ) {}

  async findOne(param: any): Promise<User> {
    return this.userRepository.findOne({ where: param });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(body: CreateClientDto, files: Express.Multer.File[]): Promise<any> {
    console.log('files:', files);
    const queryRunner = this.userRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await queryRunner.manager.save(
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

      // Save photos
      const photos = await this.photoService.create(queryRunner, user.id, urls);

      // Create a client
      const client = await this.clientService.create(queryRunner, {
        userId: user.id,
        avatar: urls[0],
      });

      await queryRunner.commitTransaction();

      return {
        ...user,
        avatar: client.avatar,
        photos: photos.map(({ url }) => url),
      };
    } catch (error) {
      // Rollback user record creation in case image upload fails
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
