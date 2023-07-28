import { Country } from "./Country";

export interface UserAvatar {
  dynamicUrl: string;
  isDefault: boolean;
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export interface UserBanner {
  dynamicUrl: string | null;
  isDefault: boolean;
  default: {
    url: string | null;
    width: number;
    height: number;
  };
  wide: {
    url: string | null;
    width: number;
    height: number;
  };
}

export interface User {
  id: number;
  countryId: number | null;
  uuid: string;

  fullName: string | null;

  username: string;

  email: string;
  emailVerificationToken: string | null;
  emailVerified: boolean;
  emailVerifiedAt: Date | null;

  phoneNumber: string | null;
  phoneNumberVerified: boolean;
  phoneNumberVerifiedAt: Date | null;

  password: string | null;

  dateOfBirth: Date | null;

  biography: string | null;

  avatarPublicId: string;
  avatarUrl: string;
  avatarIsDefault: boolean;
  googleAvatar: boolean;
  twitchAvatar: boolean;

  bannerPublicId: string | null;
  bannerUrl: string | null;
  bannerIsDefault: boolean;

  twoFactorAuthenticationEnabled: boolean;
  twoFactorAuthenticationSmsEnabled: boolean;
  twoFactorAuthenticationAppEnabled: boolean;

  notificationsEnabled: boolean;
  notificationsEmailEnabled: boolean;
  notificationsSmsEnabled: boolean;

  blockFriendsRequests: boolean;
  blockMessagesNotFriends: boolean;
  blockMessages: boolean;

  isPrivate: boolean;

  isBanned: boolean;
  bannedAt: Date | null;
  bannedReason: string | null;
  bannedUntil: Date | null;

  isShadowBanned: boolean;
  shadowBannedAt: Date | null;
  shadowBannedReason: string | null;
  shadowBannedUntil: Date | null;

  isVerified: boolean;
  verifiedAt: Date | null;

  isOnline: boolean;
  lastOnlineAt: Date | null;

  isStaffUser: boolean;
  protectionLevel: number;

  signUpMethod: "email" | "google" | "twitch";

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  country?: Country;

  avatar: UserAvatar;
  banner: UserBanner;
}
