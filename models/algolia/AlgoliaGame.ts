import { GameLogo } from "../resources/Game";

export interface AlgoliaGame {
  type: string;
  objectID: string;
  gamename: string;
  gameslug: string;
  gameLogoImageUrl: string;
  gameId: number;

  logo: GameLogo;
}
