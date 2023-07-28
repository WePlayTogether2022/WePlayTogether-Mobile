import { Game } from "@/models/resources/Game";
import { InteractionType } from "@/models/resources/InteractionType";
import client from "../client";

const API_PATH = "/interactions_types";

export const FetchAllInteractionsTypes = async (
  tokenApi: string
): Promise<{
  params: any;
  data: InteractionType[];
}> => {
  try {
    const response = await client.get(`${API_PATH}/all`, {
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
