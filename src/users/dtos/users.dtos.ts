import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

interface Profile {
  flag?: string;
  location?: string;
  bio?: string;
  realName?: string;
  fideRating?: number;
  uscfRating?: number;
  ecfRating?: number;
  cfcRating?: number;
  dsbRating?: number;
  links?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  flair?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  profile?: Profile;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
