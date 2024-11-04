import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type GameType = 'bullet' | 'blitz' | 'rapid' | 'classical';

interface Performance {
  games: number;
  rating: number;
  rd?: number;
  prog?: number;
  prov: boolean;
}

@Schema({ _id: false })
class Profile {
  @Prop()
  flag?: string;

  @Prop()
  location?: string;

  @Prop()
  bio?: string;

  @Prop()
  realName?: string;

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
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  flair?: string;

  @Prop({ default: Date.now })
  createdAt: number;

  @Prop({ default: Date.now })
  seenAt: number;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: false })
  tosViolation: boolean;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 0 })
  totalPlayTime: number;

  @Prop()
  title?: string;

  @Prop({
    type: Object,
    default: () => ({
      blitz: { games: 0, rating: 1500, prov: true },
      bullet: { games: 0, rating: 1500, prov: true },
      classical: { games: 0, rating: 1500, prov: true },
      rapid: { games: 0, rating: 1500, prov: true },
    }),
  })
  perfs: {
    [type in GameType]: Performance;
  };

  @Prop({ type: Profile })
  profile?: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
