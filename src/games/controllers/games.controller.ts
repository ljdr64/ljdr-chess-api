import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateGameDto, UpdateGameDto } from '../dtos/games.dtos';
import { GamesService } from '../services/games.service';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  async create(@Body() createGameDto: CreateGameDto) {
    return await this.gamesService.create(createGameDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game by id' })
  async findOne(@Param('id') id: string) {
    return await this.gamesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a game by id' })
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return await this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game by id' })
  async remove(@Param('id') id: string) {
    return await this.gamesService.remove(id);
  }
}
