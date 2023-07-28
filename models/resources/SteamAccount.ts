export interface SteamAccount {
  id: number;
  userId: number;
  steamId: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
