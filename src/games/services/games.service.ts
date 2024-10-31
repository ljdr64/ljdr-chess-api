import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Game } from '../entities/game.entity';
import {
  CreateGameDto,
  UpdateGameDto,
  FilterGamesDto,
} from '../dtos/games.dtos';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  findAll(params?: FilterGamesDto) {
    if (params) {
      const filters: FilterQuery<Game> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return this.gameModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.gameModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    return game;
  }

  create(data: CreateGameDto) {
    const newGame = new this.gameModel(data);
    return newGame.save();
  }

  update(id: string, changes: UpdateGameDto) {
    const game = this.gameModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    return game;
  }

  remove(id: string) {
    return this.gameModel.findByIdAndDelete(id);
  }
}
