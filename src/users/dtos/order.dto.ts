import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly games: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['games']),
) {}

export class AddGamesToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly gamesIds: string[];
}
