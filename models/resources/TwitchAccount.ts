export interface TwitchAccount {
  id: number;
  userId: number;
  twitchUserId: string;

  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
