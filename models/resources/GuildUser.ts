import { Guild } from "./Guild";
import { User } from "./User";

export interface GuildUser {
  id: number;
  userId: number;
  guildId: number;
  getstreamChannelUserId: number;

  isOwner: boolean;

  isProPlayer: boolean;
  isContentCreator: boolean;

  memberSince: Date;
  memberUntil: Date | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  guild?: Guild;
  user?: User;
}
