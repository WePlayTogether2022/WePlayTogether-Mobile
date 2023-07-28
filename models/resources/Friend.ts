import { FriendshipStatus } from "./FriendshipStatus";
import { User } from "./User";

export interface Friend {
  id: number;
  userId: number;
  friendId: number;
  friendshipStatusId: number;
  acceptedAt: Date | null;
  rejectedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user?: User;
  friend?: User;
  friendshipStatus?: FriendshipStatus;
}
