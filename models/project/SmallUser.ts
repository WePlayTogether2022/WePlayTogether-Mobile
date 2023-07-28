import { UserAvatar } from "../resources/User";

export interface SmallUser {
  id: number;
  username: string;
  fullName: string | null;
  isVerified: boolean;
  isPrivate: boolean;
  avatar: UserAvatar;

  isProPlayer?: boolean;
  isContentCreator?: boolean;
}
