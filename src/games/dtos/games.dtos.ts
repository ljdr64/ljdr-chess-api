import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dtos';
import { CreateSubDocDto } from './sub-doc.dto';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `game's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[];
}

export class UpdateGameDto extends PartialType(CreateGameDto) {}

export class FilterGamesDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
