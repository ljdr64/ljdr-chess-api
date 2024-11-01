import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsObject,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

type GameType = 'bullet' | 'blitz' | 'rapid' | 'classical';

interface Performance {
  games: number;
  rating: number;
  rd?: number;
  prog?: number;
  prov?: boolean;
}

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
  @IsString()
  username: string;

  @IsString()
  flair: string;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  seenAt: number;

  @IsBoolean()
  disabled: boolean;

  @IsBoolean()
  tosViolation: boolean;

  @IsBoolean()
  verified: boolean;

  @IsNumber()
  totalPlayTime: number;

  @IsString()
  title: string;

  @IsObject()
  perfs: {
    [type in GameType]: Performance;
  };

  @IsOptional()
  profile?: Profile;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
