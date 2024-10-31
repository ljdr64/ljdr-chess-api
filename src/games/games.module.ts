import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './controllers/games.controller';
import { BrandsController } from './controllers/brands.controller';
import { Brand, BrandSchema } from './entities/brand.entity';
import { CategoriesController } from './controllers/categories.controller';
import { GamesService } from './services/games.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { Game, GameSchema } from './entities/game.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [GamesController, CategoriesController, BrandsController],
  providers: [GamesService, BrandsService, CategoriesService],
  exports: [GamesService, MongooseModule],
})
export class GamesModule {}
