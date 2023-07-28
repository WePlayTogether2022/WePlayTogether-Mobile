import { UserAvatar } from "../resources/User";

export interface AlgoliaUser {
  type: string;
  objectID: string;
  username: string;
  fullName: string;
  userId: number;
  avatarUrl: string;
  isVerified: boolean;
  avatar: UserAvatar;
}
