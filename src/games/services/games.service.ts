import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto, UpdateGameDto } from '../dtos/games.dtos';
import { Game } from '../entities/game.entity';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async create(createGameDto: CreateGameDto) {
    const newGame = new this.gameModel(createGameDto);
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
