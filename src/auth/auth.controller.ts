import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { PhotoService } from 'src/photo/photo.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly photoService: PhotoService) {}

  @ApiOperation({ description: 'Login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'Get user info' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  async profile(@Req() req) {
    const photos = await this.photoService.findByUserId(req.user.id);

    return { ...req.user, photos };
  }
}
