import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { Game } from '../../games/entities/game.entity';

import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Game.name) private gameModel: Model<Game>,
  ) {}

  async findAll() {
    const orders = await this.orderModel.find().populate('customer');
    for (const order of orders) {
      await Promise.all(
        order.games.map(async (gameId, index) => {
          const game = await this.gameModel.findById(gameId);
          order.games[index] = game;
        }),
      );
    }
    return orders;
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeGame(id: string, gameId: string) {
    const order = await this.orderModel.findById(id);
    order.games.pull(gameId);
    return order.save();
  }

  async addGames(id: string, gameIds: string[]) {
    const order = await this.orderModel.findById(id);
    gameIds.forEach((pId) => order.games.push(pId));
    return order.save();
  }
}
