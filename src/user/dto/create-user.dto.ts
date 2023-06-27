import { IsEmail, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { UserExistsByEmailValidator } from '../validator/user-exists-by-email.validator';

export class CreateClientDto {
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  lastName: string;

  @IsEmail()
  @MaxLength(255)
  @Validate(UserExistsByEmailValidator)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/.*[0-9].*/, { message: 'Password must contain at least one number' })
  password: string;

  @IsString()
  role: string;
}
