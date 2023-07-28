import { User } from "./User";

export interface BlockedUser {
  id: number;
  userId: number;
  blockedUserId: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  blockedUser?: User;
}
