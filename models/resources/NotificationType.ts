export interface NotificationType {
  id: number;
  type: string;
  text: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
