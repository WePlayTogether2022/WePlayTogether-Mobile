import { Country } from "../resources/Country";
import { UserAvatar, UserBanner } from "../resources/User";

export interface UserProfileFriends {
  id: number;
  username: string;
  avatar: {
    publicId: string | null;
    url: string | null;
    isDefault: boolean;
  };
}

export interface BiographyEntity {
  user: {
    username: string;
  };
}

export interface Biography {
  rawText: string;
  entities: BiographyEntity[];
}

export interface UserProfile {
  id: number;
  countryId: number | null;
  fullName: string | null;
  username: string;
  dateOfBirth: Date | null;
  biography: Biography | null;
  avatar: UserAvatar;
  banner: UserBanner;
  isPrivate: boolean;
  isVerified: boolean;
  isOnline: boolean;
  lastOnlineAt: Date | null;
  isStaffUser: boolean;
  createdAt: Date;
  country: Country | null;

  tournamentsPlayed: number;
  tournamentsWon: number;
  tournamentsLost: number;

  rank: number;

  channelId: string | null;

  guildId: number | null;

  blockedByViewer: boolean;
  isMyProfile: boolean;

  isMyFriend: boolean;
  totalFriends: number;

  requestSent: boolean;
  requestReceived: boolean;
}
