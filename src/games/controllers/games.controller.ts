import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import {
  CreateGameDto,
  UpdateGameDto,
  FilterGamesDto,
} from '../dtos/games.dtos';
import { GamesService } from '../services/games.service';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'List of games' })
  getGames(@Query() params: FilterGamesDto) {
    return this.gamesService.findAll(params);
  }

  @Get('filter')
  getGameFilter() {
    return `yo soy un filter`;
  }

  @Get(':gameId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('gameId', MongoIdPipe) gameId: string) {
    return this.gamesService.findOne(gameId);
  }

  @Post()
  create(@Body() payload: CreateGameDto) {
    return this.gamesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateGameDto) {
    return this.gamesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
