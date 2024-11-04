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
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const newUser = new this.userModel({
      ...createUserDto,
      ...userDefault,
    });

    return await newUser.save();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { username },
      { $set: updateUserDto },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return updatedUser;
  }

  async remove(username: string) {
    const result = await this.userModel.findOneAndDelete({ username });
    if (!result) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return result;
  }
}
