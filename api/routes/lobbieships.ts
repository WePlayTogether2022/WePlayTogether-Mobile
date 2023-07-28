import { SmallUser } from "@/models/project/SmallUser";
import client from "../client";

const API_PATH = "/lobbieships";

export interface Lobbyship {
  [key: string]: LobbyshipStatus;
}

export interface LobbyshipStatus {
  member: boolean;
}

export const FetchShowLobbyShip = async (
  lobbyId: number,
  tokenApi: string
): Promise<Lobbyship> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/show`, { lobbyId });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchLobbyUsersCount = async (
  lobbyId: number,
  tokenApi: string
): Promise<{
  count: number;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(`${API_PATH}/${lobbyId}/users/count`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchLobbyUsers = async (
  lobbyId: number | string | undefined,
  tokenApi: string,
  usernameFilter: string | null,
  page?: number
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: SmallUser[];
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;

  try {
    if (!lobbyId) throw new Error("Lobby ID is undefined");
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(
      `${API_PATH}/${lobbyId}/users?pageNumber=${pageNumber}&query=${usernameFilter}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchCountLobbyBlockedUsers = async (
  id: number,
  tokenAPI: string
): Promise<{
  count: number;
}> => {
  try {
    const response = await client.get(`${API_PATH}/${id}/users/blocked/count`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const JoinLobby = async (
  id: number,
  tokenAPI: string
): Promise<{
  message: string;
  lobbyshipStatus: LobbyshipStatus;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${id}/join`,
      {},
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

export const LeaveLobby = async (
  id: number,
  tokenAPI: string
): Promise<{
  message: string;
  lobbyshipStatus: LobbyshipStatus;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${id}/leave`,
      {
        lobbyId: id,
      },
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

export const KickUserFromLobby = async (
  lobbyId: number,
  userId: number,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${lobbyId}/kick/${userId}`,
      {
        lobbyId,
        userId,
      },
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
