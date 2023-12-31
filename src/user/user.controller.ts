import { BadRequestException, Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateClientDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: 'Get all referred users' })
  @Post('register')
  @UseInterceptors(FilesInterceptor('files'))
  async registerClient(@Body() body: CreateClientDto, @UploadedFiles() files: Express.Multer.File[]): Promise<any> {
    if (!files || files.length < 4) {
      throw new BadRequestException('Must upload at least 4 images');
    }

    return this.userService.create(body, files);
  }
}
