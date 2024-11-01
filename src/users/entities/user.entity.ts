import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type GameType = 'bullet' | 'blitz' | 'rapid' | 'standard';

interface Performance {
  games: number;
  rating: number;
  rd?: number;
  prog?: number;
  prov?: boolean;
}

@Schema()
export class Profile {
  @Prop({ required: true })
  flag: string;

  @Prop()
  location?: string;

  @Prop()
  bio?: string;

  @Prop({ required: true })
  realName: string;

  @Prop()
  fideRating?: number;

  @Prop()
  uscfRating?: number;

  @Prop()
  ecfRating?: number;

  @Prop()
  cfcRating?: number;

  @Prop()
  dsbRating?: number;

  @Prop()
  links?: string;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop()
  flair?: string;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  seenAt: number;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: false })
  tosViolation: boolean;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ required: true })
  totalPlayTime: number;

  @Prop()
  title?: string;

  @Prop({ type: Object })
  perfs: {
    [type in GameType]: Performance;
  };

  @Prop({ type: Profile })
  profile?: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
