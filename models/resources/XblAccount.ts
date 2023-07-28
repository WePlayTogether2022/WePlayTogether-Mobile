export interface XblAccount {
  id: number;
  userId: number;
  xuid: string;
  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
