import { Game } from "../resources/Game";
import { LobbyImage } from "../resources/Lobby";
import { User } from "../resources/User";
import { Console } from "../resources/Console";
import { LobbyType } from "../resources/LobbyType";

export interface LobbyProfile {
  id: number;

  title: string;
  description: string | null;
  maxPlayers: number;
  isFull: boolean;
  console: Console | null;
  game: Game;
  lobbyType: LobbyType;

  image: LobbyImage;

  founder: User;

  totalUsers: number;

  createdByViewer: boolean;
  joinedByViewer: boolean;

  channelId: string | null;

  createdAt: Date;
}
