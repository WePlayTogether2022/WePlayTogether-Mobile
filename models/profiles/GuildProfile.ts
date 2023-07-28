import { Country } from "../resources/Country";
import { GuildLogo } from "../resources/Guild";

export interface GuildProfile {
  id: number;
  name: string;
  description: string | null;
  websiteUrl: string | null;
  isVerified: boolean;
  logo: GuildLogo;
  country: Country;

  totalUsers: number;
  isFull: boolean;

  createdByViewer: boolean;
  joinedByViewer: boolean;
  channelId: string | null;
}
