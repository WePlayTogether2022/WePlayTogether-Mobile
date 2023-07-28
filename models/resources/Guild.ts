import { Country } from "./Country";

export interface GuildLogo {
  dynamicUrl: string;
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Guild {
  id: number;
  userId: number;
  countryId: number;
  getstreamChannelId: number;
  uuid: string;
  name: string;
  description: string | null;
  websiteUrl: string | null;
  logoPublicId: string;
  logoUrl: string;

  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  country?: Country;

  logo: GuildLogo;
}
