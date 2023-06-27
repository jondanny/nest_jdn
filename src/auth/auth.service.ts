import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserAccessTokenInterface } from './auth.types';
import { UserService } from 'src/user/user.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly clientService: ClientService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const client = await this.clientService.findOne({ userId: user.id });

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: client.avatar,
      };
    }

    return null;
  }

  async login(user: Partial<User>): Promise<{ accessToken: string }> {
    const accessToken = await this.createAccessToken(user);

    return { accessToken };
  }

  async createAccessToken(user: any): Promise<string> {
    const payload: UserAccessTokenInterface = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    return this.jwtService.signAsync(payload);
  }
}
