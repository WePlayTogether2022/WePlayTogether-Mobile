import { Country } from "@/models/resources/Country";
import { LobbyType } from "@/models/resources/LobbyType";
import client from "../client";

const API_PATH = "/lobbies_types";

export const FetchLobbiesTypes = async (
  tokenApi: string,
  page?: number
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: LobbyType[];
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;

  var url = `${API_PATH}/get_lobbies_types?pageNumber=${pageNumber}`;

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
