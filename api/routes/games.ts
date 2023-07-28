import { UserGame } from "@/models/resources/UserGame";
import { Game } from "@/models/resources/Game";
import client from "../client";

const API_PATH = "/games";

export const FetchGames = async (
  tokenApi: string,
  page?: number,
  pageSize?: number
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: Game[];
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;
  const pageSizeNumber = pageSize && pageSize > 0 ? pageSize : 30;

  var url = `${API_PATH}/get_games?pageNumber=${pageNumber}&pageSize=${pageSizeNumber}`;

  try {
    const response = await client.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenApi}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchUserGames = async (
  userId: number,
  tokenApi: string
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: UserGame[];
  };
}> => {
  try {
    const response = await client.get(`${API_PATH}/available`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
};
