import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto, UpdateGameDto } from '../dtos/games.dtos';
import { Game } from '../entities/game.entity';

import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private usersService: UsersService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const existingGame = await this.gameModel.findOne({
      id: createGameDto.id,
    });
    if (existingGame) {
      throw new ConflictException('Id already exists');
    }

    const newGame = new this.gameModel(createGameDto);

    const { players } = newGame;
    await this.usersService.updateUserGamesCount(
      players.white.user.id,
      createGameDto.perf,
    );
    await this.usersService.updateUserGamesCount(
      players.black.user.id,
      createGameDto.perf,
    );

    return await newGame.save();
  }

  async findOne(id: string) {
    const game = await this.gameModel.findOne({ id });
    if (!game) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const updatedGame = await this.gameModel.findOneAndUpdate(
      { id },
      { $set: updateGameDto },
      { new: true },
    );
    if (!updatedGame) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return updatedGame;
  }

  async remove(id: string) {
    const result = await this.gameModel.findOneAndDelete({ id });
    if (!result) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return result;
  }
}
