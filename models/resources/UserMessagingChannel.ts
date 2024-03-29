import { GetstreamChannel } from "./GetstreamChannel";

export interface UserMessagingChannel {
  id: number;
  userId: number;
  memberId: number;
  getstreamChannelId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  getstreamChannel?: GetstreamChannel;
}
