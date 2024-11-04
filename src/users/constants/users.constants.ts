import { User } from '../entities/user.entity';

export const userDefault: Partial<User> = {
  createdAt: Date.now(),
  seenAt: Date.now(),
  disabled: false,
  tosViolation: false,
  verified: false,
  totalPlayTime: 0,
  perfs: {
    blitz: { games: 0, rating: 1500, prov: true },
    bullet: { games: 0, rating: 1500, prov: true },
    classical: { games: 0, rating: 1500, prov: true },
    rapid: { games: 0, rating: 1500, prov: true },
  },
};
