export interface EpicGamesAccount {
  id: number;
  userId: number;
  accountId: string;

  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
