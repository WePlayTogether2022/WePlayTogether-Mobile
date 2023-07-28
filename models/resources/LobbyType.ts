export interface LobbyType {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
