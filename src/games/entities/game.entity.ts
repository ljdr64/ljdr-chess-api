import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameType } from '../enum/game-type.enum';

export type GameDocument = Game & Document;

@Schema({ _id: false })
class PlayerUser {
  @Prop({ required: true })
  name: string;

  @Prop()
  title?: string;

  @Prop({ required: true })
  id: string;
}

@Schema({ _id: false })
class Player {
  @Prop({ type: PlayerUser, required: true })
  user: PlayerUser;

  @Prop({ required: true })
  rating: number;
}

@Schema({ _id: false })
class Players {
  @Prop({ type: Player, required: true })
  white: Player;

  @Prop({ type: Player, required: true })
  black: Player;
}

@Schema({ _id: false })
class Move {
  @Prop({ required: true })
  fen: string;

  @Prop()
  lm?: string;

  @Prop({ required: true })
  wc: number;

  @Prop({ required: true })
  bc: number;
}

@Schema()
export class Game {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Object, required: true })
  variant: {
    key: string;
    name: string;
    short: string;
  };

  @Prop({ required: true })
  speed: GameType;

  @Prop({ required: true })
  perf: GameType;

  @Prop({ required: true })
  rated: boolean;

  @Prop({ required: true })
  initialFen: string;

  @Prop({ required: true })
  fen: string;

  @Prop({ required: true })
  player: string;

  @Prop({ required: true })
  turns: number;

  @Prop({ required: true })
  startedAtTurn: number;

  @Prop({ required: true })
  source: string;

  @Prop({ type: Object, required: false })
  status?: {
    id: number;
    name: string;
  };

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  lastMove: string;

  @Prop({ type: Players, required: true })
  players: Players;

  @Prop({ type: [] })
  moves: Move[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
