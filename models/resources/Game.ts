import { Platform } from "./Platform";

export interface GameLogo {
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export interface GameBackgroundImage {
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export function instanceOfGame(object: any): object is Game {
  return "releaseDate" in object;
}

export interface Game {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string | null;
  logoImageUrl: string;
  backgroundImageUrl: string;
  releaseDate: Date | null;
  saturatedColor: string | null;
  dominantColor: string | null;

  statsAvaible: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  // Dalla vista v_games
  playersCount: number;
  lobbiesCount: number;
  tournamentsCount: number;

  platforms?: Platform[];

  logo: GameLogo;
  backgroundImage: GameBackgroundImage;
}
