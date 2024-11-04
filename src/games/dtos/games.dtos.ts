import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { GameType } from '../enum/game-type.enum';

class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}

class PlayerDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @IsNotEmpty()
  rating: number;
}

class MoveDto {
  @IsString()
  fen: string;

  @IsOptional()
  @IsString()
  lm?: string;

  @IsNumber()
  wc: number;

  @IsNumber()
  bc: number;
}

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsObject()
  variant: {
    key: string;
    name: string;
    short: string;
  };

  @IsNotEmpty()
  @IsString()
  @IsEnum(GameType)
  speed: GameType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(GameType)
  perf: GameType;

  @IsNotEmpty()
  @IsBoolean()
  rated: boolean;

  @IsNotEmpty()
  @IsString()
  initialFen: string;

  @IsNotEmpty()
  @IsString()
  fen: string;

  @IsNotEmpty()
  @IsString()
  player: string;

  @IsNotEmpty()
  turns: number;

  @IsNotEmpty()
  startedAtTurn: number;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsOptional()
  status?: {
    id: number;
    name: string;
  };

  @IsNotEmpty()
  createdAt: number;

  @IsNotEmpty()
  @IsString()
  lastMove: string;

  @IsNotEmpty()
  players: {
    white: PlayerDto;
    black: PlayerDto;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MoveDto)
  moves: MoveDto[];
}

export class UpdateGameDto extends PartialType(CreateGameDto) {}
