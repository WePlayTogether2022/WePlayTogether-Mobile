import { GuildLogo } from "../resources/Guild";

export interface AlgoliaGuild {
  type: string;
  objectID: string;
  guildname: string;
  guildId: number;
  isVerified: boolean;
  guildLogoImageUrl: string;

  logo: GuildLogo;
}
