import { Console } from "@/models/resources/Console";
import client from "../client";

const API_PATH = "/consoles";

export const FetchConsoles = async (
  tokenApi: string,
  page?: number
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: Console[];
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;

  var url = `${API_PATH}/get_consoles?pageNumber=${pageNumber}`;

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
