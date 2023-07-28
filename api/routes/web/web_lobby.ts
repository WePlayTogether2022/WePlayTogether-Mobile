import { LobbyProfile } from "../@/models/profiles/LobbyProfile";
import client from "../../client";

const API_PATH = "/web";
const PATH = "lobby";

export const FetchLobbyProfileByLobbyId = async ({
  queryKey,
}: any): Promise<LobbyProfile> => {
  const [_, lobbyId, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/${PATH}/${lobbyId}`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchLobbyIsFull = async (
  id: number,
  tokenAPI: string
): Promise<{
  message: string;
  isFull: boolean;
}> => {
  try {
    const response = await client.get(`${API_PATH}/${PATH}/${id}/is-full`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
