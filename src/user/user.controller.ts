import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateClientDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('files'))
  async registerClient(@Body() body: CreateClientDto, @UploadedFiles() files: Express.Multer.File[]): Promise<any> {
    return this.userService.create(body, files);
  }
}
