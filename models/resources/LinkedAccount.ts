import { EpicGamesAccount } from "./EpicGamesAccount";
import { GoogleAccount } from "./GoogleAccount";
import { LinkedAccountType } from "./LinkedAccountType";
import { PsnAccount } from "./PsnAccount";
import { SteamAccount } from "./SteamAccount";
import { TwitchAccount } from "./TwitchAccount";
import { XblAccount } from "./XblAccount";

export interface LinkedAccount {
  id: number;
  userId: number;
  linkedAccountTypeId: number;
  epicGamesAccountId: number | null;
  twitchAccountId: number | null;
  googleAccountId: number | null;
  steamAccountId: number | null;
  psnAccountId: number | null;
  xblAccountId: number | null;

  isVerified: boolean;
  displayName: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  linkedAccountType?: LinkedAccountType;
  epicGamesAccount?: EpicGamesAccount;
  twitchAccount?: TwitchAccount;
  googleAccount?: GoogleAccount;
  steamAccount?: SteamAccount;
  psnAccount?: PsnAccount;
  xblAccount?: XblAccount;
}
