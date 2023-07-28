import { UserDeviceProfile } from "@/models/profiles/UserDeviceProfile";
import { BlockedUser } from "@/models/resources/BlockedUser";
import { getDeviceUuid } from "../../secure-store/DeviceUuid";
import client from "../client";

const API_PATH = "/user/settings";

export const FetchShowOldPasswordField = async ({
  queryKey,
}: any): Promise<{
  message: string;
  showOldPasswordField: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(
      `${API_PATH}/password/show-old-password-field`,
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

export const FetchIsTfaEnabled = async ({
  queryKey,
}: any): Promise<{
  message: string;
  isTfaEnabled: boolean;
}> => {
  const [_, tokenAPI] = queryKey;
  try {
    const response = await client.get(`${API_PATH}/tfa/enabled`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchIsTfaAvailable = async ({
  queryKey,
}: any): Promise<{
  message: string;
  isTfaAvailable: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/tfa/available`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchDeviceActivity = async (
  tokenApi: string,
  page?: number
): Promise<{
  results: UserDeviceProfile[];
  total: number;
  pageSize: number;
  pageNumber: number;
}> => {
  const deviceUUID = await getDeviceUuid();

  const pageNumber = page && page > 0 ? page : 1;
  var url = `${API_PATH}/device-activity?pageNumber=${pageNumber}`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
        DeviceUuid: deviceUUID,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchIsPrivate = async ({
  queryKey,
}: any): Promise<{
  message: string;
  isPrivate: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/private`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateIsPrivate = async (
  tokenApi: string,
  isPrivate: boolean
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/private`,
      {
        isPrivate: isPrivate,
      },
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

export const FetchBlockFriendsRequests = async ({
  queryKey,
}: any): Promise<{
  message: string;
  blockFriendsRequests: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/block-friends-requests`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateBlockFriendsRequests = async (
  tokenApi: string,
  blockFriendsRequests: boolean
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/block-friends-requests`,
      {
        blockFriendsRequests: blockFriendsRequests,
      },
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

export const FetchBlockedUsers = async (
  tokenApi: string,
  page?: number
): Promise<{
  results: BlockedUser[];
  total: number;
  pageSize: number;
  pageNumber: number;
}> => {
  const deviceUUID = await getDeviceUuid();

  const pageNumber = page && page > 0 ? page : 1;
  var url = `${API_PATH}/blocked-users?pageNumber=${pageNumber}`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
        DeviceUuid: deviceUUID,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchBlockMessages = async ({
  queryKey,
}: any): Promise<{
  message: string;
  blockMessages: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/block-messages`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateBlockMessages = async (
  tokenApi: string,
  blockMessages: boolean
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/block-messages`,
      {
        blockMessages: blockMessages,
      },
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

export const FetchBlockMessagesNotFriends = async ({
  queryKey,
}: any): Promise<{
  message: string;
  blockMessagesNotFriends: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(
      `${API_PATH}/block-messages-not-friends`,
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

export const UpdateBlockMessagesNotFriends = async (
  tokenApi: string,
  blockMessagesNotFriends: boolean
): Promise<{
  message: string;
}> => {
  const deviceUUID = await getDeviceUuid();

  try {
    const response = await client.put(
      `${API_PATH}/block-messages-not-friends`,
      {
        blockMessagesNotFriends: blockMessagesNotFriends,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenApi}`,
          DeviceUuid: deviceUUID,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
