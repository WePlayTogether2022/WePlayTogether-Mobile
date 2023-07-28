export interface LobbyImage {
  dynamicUrl: string;
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Lobby {
  id: number;
  uuid: string;
  userId: number;
  gameId: number;
  lobbyTypeId: number;
  consoleId: number | null;
  getstreamChannelId: number;
  title: string;
  description: string | null;
  maxPlayers: number;
  imageUrl: string;
  imagePublicId: string;
  currentPlayers: number;
  isFull: boolean;

  image: LobbyImage;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
