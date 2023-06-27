import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { S3Module } from 'src/s3/s3.module';
import { ClientModule } from 'src/client/client.module';
import { UserRepository } from './user.repository';
import { UserExistsByEmailValidator } from './validator/user-exists-by-email.validator';
import { UserController } from './user.controller';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [S3Module, ClientModule, PhotoModule],
  providers: [UserService, UserRepository, UserExistsByEmailValidator],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
