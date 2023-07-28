import { Game } from "./Game";
import { Platform } from "./Platform";
import { User } from "./User";

export interface UserGame {
  id: number;
  userId: number;
  gameId: number;
  platformId: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user?: User;
  game?: Game;
  platform?: Platform;
}
