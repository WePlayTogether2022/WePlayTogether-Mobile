import { Lobby } from "./Lobby";
import { User } from "./User";

export interface LobbyUser {
  id: number;
  lobbyId: number;
  userId: number;
  getstreamChannelUserId: number;

  isOwner: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  lobby?: Lobby;
  user?: User;
}
