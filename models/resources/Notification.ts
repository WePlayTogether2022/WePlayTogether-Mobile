import { NotificationType } from "./NotificationType";

export interface Notification {
  id: number;
  userId: number;
  senderId: number;
  notificationTypeId: number;
  friendId: number | null;
  lobbyId: number | null;
  lobbyUserId: number | null;
  guildInvitationId: number | null;
  guildUserId: number | null;
  guildId: number | null;

  title: string;
  text: string;
  data: string;

  seenByUser: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  notificationType?: NotificationType;
}
