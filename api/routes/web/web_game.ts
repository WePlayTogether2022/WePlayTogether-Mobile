import { Game } from "../@/models/resources/Game";
import { Lobby } from "../@/models/resources/Lobby";
import { UserGame } from "../@/models/resources/UserGame";
import client from "../../client";

const API_PATH = "/web";
const PATH_GAME = "game";

export const FetchGameProfileByGameId = async ({
  queryKey,
}: any): Promise<Game> => {
  const [_, gameId, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/${PATH_GAME}/${gameId}`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGamePlayersByGameId = async (
  gameId: number,
  tokenAPI: string,
  page?: number
): Promise<{
  params: {};
  data: {
    results: UserGame[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  let url = `${API_PATH}/${PATH_GAME}/${gameId}/users`;

  if (page && page > 1) {
    url = `${url}?pageNumber=${page}`;
  } else {
    url = `${url}?pageNumber=1`;
  }

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGameLobbiesByGameId = async (
  gameId: number,
  tokenAPI: string,
  page?: number
): Promise<{
  params: {};
  data: {
    results: Lobby[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  let url = `${API_PATH}/${PATH_GAME}/${gameId}/lobbies`;

  if (page && page > 1) {
    url = `${url}?pageNumber=${page}`;
  } else {
    url = `${url}?pageNumber=1`;
  }

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
