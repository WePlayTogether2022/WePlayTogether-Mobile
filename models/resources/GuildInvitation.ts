import { User } from "./User";

export interface GuildInvitation {
  id: number;
  guildId: number;
  userId: number;
  invitedUserId: number;
  acceptedAt: Date;
  rejectedAt: Date;

  token: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  invitedUser?: User;
}
