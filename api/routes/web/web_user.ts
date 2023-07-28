import { UserProfile } from "../@/models/profiles/UserProfile";
import { Guild } from "../@/models/resources/Guild";
import { UserGame } from "../@/models/resources/UserGame";
import client from "../../client";

const API_PATH = "/web";
const PATH_USER = "user";

export const FetchUserProfileByUserId = async ({
  queryKey,
}: any): Promise<UserProfile> => {
  const [_, userId, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/${PATH_USER}/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Games
export const FetchUserGamesByUserId = async ({
  queryKey,
}: any): Promise<UserGame[]> => {
  const [_, userId, tokenAPI] = queryKey;

  try {
    const response = await client.get(
      `${API_PATH}/${PATH_USER}/${userId}/games`,
      {
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const FetchUserGamesCountByUserId = async ({
  queryKey,
}: any): Promise<{
  count: number;
}> => {
  const [_, userId, tokenAPI] = queryKey;

  try {
    const response = await client.get(
      `${API_PATH}/${PATH_USER}/${userId}/games/count`,
      {
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Guild
export const FetchUserGuildByUserId = async ({
  queryKey,
}: any): Promise<Guild> => {
  const [_, userId, tokenAPI] = queryKey;

  try {
    const response = await client.get(
      `${API_PATH}/${PATH_USER}/${userId}/guild`,
      {
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
