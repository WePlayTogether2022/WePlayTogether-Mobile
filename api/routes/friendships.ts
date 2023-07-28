import { SmallUser } from "@/models/project/SmallUser";
import client from "../client";

const API_PATH = "/friendships";

export interface Friendship {
  [key: string]: FriendshipStatus;
}

export interface FriendshipStatus {
  friends: boolean;
  incomingFriendRequest: boolean;
  outgoingFriendRequest: boolean;
  isPrivate: boolean;
}

export const FetchShowFriendship = async (
  userId: number,
  tokenApi: string
): Promise<Friendship> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/show`, { userId });

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Returns an object with the following structure:
 * {
 *
 *  [userId]: {},
 * [userId]: {},
 * }
 */
export const FetchShowManyFriendships = async (
  userIds: number[],
  tokenApi: string
): Promise<{
  [key: string]: FriendshipStatus;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/show-many`, { userIds });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateFriendship = async (
  userId: number,
  tokenApi: string
): Promise<{
  message: string;
  friendshipStatus: FriendshipStatus;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/create/${userId}`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DestroyFriendship = async (
  userId: number,
  tokenApi: string
): Promise<{
  message: string;
  friendshipStatus: FriendshipStatus;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/destroy/${userId}`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AcceptFriendship = async (
  userId: number,
  tokenApi: string
): Promise<{
  message: string;
  friendshipStatus: FriendshipStatus;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/accept/${userId}`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DenyFriendship = async (
  userId: number,
  tokenApi: string
): Promise<{
  message: string;
  friendshipStatus: FriendshipStatus;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/deny/${userId}`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const BlockUser = async (
  userId: number,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/${userId}/block`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UnblockUser = async (
  userId: number,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/${userId}/unblock`, {
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchFriendsCount = async (
  userId: number,
  tokenApi: string
): Promise<{
  count: number;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(`${API_PATH}/${userId}/friends/count`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchFriends = async (
  userId: number | string | undefined,
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
    if (!userId) throw new Error("User ID is undefined");
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(
      `${API_PATH}/${userId}/friends?pageNumber=${pageNumber}&query=${usernameFilter}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
