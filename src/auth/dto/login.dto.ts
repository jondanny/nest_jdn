import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com', required: true, description: 'Email' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'Password123!@#', required: true, description: 'Password' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
