import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { userDefault } from '../constants/users.constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      id: createUserDto.username.toLowerCase(),
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const newUser = new this.userModel({
      id: createUserDto.username.toLowerCase(),
      ...createUserDto,
      ...userDefault,
    });

    return await newUser.save();
  }

  async updateUserGamesCount(username: string, gameType: string) {
    const result = await this.userModel.updateOne(
      { id: username.toLowerCase() },
      { $inc: { [`perfs.${gameType}.games`]: 1 } },
    );
    return result;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User with username ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id },
      { $set: updateUserDto },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with username ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userModel.findOneAndDelete({ id });
    if (!result) {
      throw new NotFoundException(`User with username ${id} not found`);
    }
    return result;
  }
}
