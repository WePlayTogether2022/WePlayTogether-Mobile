export interface InteractionType {
  id: number;
  name: string;
  description: string | null;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
