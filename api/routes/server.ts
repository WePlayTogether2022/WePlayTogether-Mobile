import { Game } from "@/models/resources/Game";
import client from "../client";

const API_PATH = "/server";

export const FetchServerNow = async (): Promise<{
  timestamp: number;
}> => {
  var url = `${API_PATH}/timestamp/now`;

  try {
    const response = await client.get(url, {});

    return response.data;
  } catch (error) {
    throw error;
  }
};
