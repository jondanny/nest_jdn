import { IsEmail, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserExistsByEmailValidator } from '../validator/user-exists-by-email.validator';

export class CreateClientDto {
  @ApiProperty({ example: 'John', required: true, description: 'First name' })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  firstName: string;

  @ApiProperty({ example: 'Doe', required: true, description: 'First name' })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', required: true, description: 'Email' })
  @IsEmail()
  @MaxLength(255)
  @Validate(UserExistsByEmailValidator)
  email: string;

  @ApiProperty({ example: 'Password123!@#', required: true, description: 'Password' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/.*[0-9].*/, { message: 'Password must contain at least one number' })
  password: string;
}
