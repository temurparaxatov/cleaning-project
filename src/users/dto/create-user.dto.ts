import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Min(3)
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsBoolean()
  is_active?: boolean;
}
