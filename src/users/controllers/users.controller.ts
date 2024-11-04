import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get a user by username' })
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  @Put(':username')
  @ApiOperation({ summary: 'Update a user by username' })
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(username, updateUserDto);
  }

  @Delete(':username')
  @ApiOperation({ summary: 'Delete a user by username' })
  async remove(@Param('username') username: string) {
    return await this.usersService.remove(username);
  }
}
