export interface CreateLobbyDto {
  gameId: number;
  lobbyTypeId: number;
  consoleId: number | null;
  title: string;
  description: string | null;
  maxPlayers: number;

  imageUrl: string;
}

export interface UpdateLobbyDto {
  title: string;
  description: string | null;
  maxPlayers: number;

  imageUrl?: string;
}
