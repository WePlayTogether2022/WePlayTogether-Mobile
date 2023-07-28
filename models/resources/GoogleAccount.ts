export interface GoogleAccount {
  id: number;
  userId: number;
  googleId: string;
  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
