import { UserNotification } from "@/models/project/UserNotifications";
import client, { API_URL } from "../client";

const API_PATH = "/notifications";

export const FetchNotificationsBadges = async (
  userIds: number[],
  tokenApi: string
): Promise<{
  [key: string]: {
    unreadCount: number;
  };
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/badge`, { userIds });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchNotificationsInbox = async (
  tokenApi: string,
  page?: number,
  pageSize?: number
): Promise<{
  params: any;
  data: {
    results: UserNotification[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;
  const pageSizeNumber = pageSize && pageSize > 0 ? pageSize : 30;

  let url = `${API_PATH}/inbox?pageNumber=${pageNumber}&pageSize=${pageSizeNumber}`;

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ReadAllNotifications = async (
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/read_all`,
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

export const DeleteNotification = async (
  notificationId: number,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.delete(`${API_PATH}/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ExecuteUserNotificationAction = async (
  endpoint: string,
  payload: any | undefined,
  tokenApi: string
): Promise<any> => {
  let newEndpoint = endpoint;

  // Se endpoint iniciar com /, remove
  if (endpoint.charAt(0) === "/") {
    newEndpoint = endpoint.substring(1);
  }

  let url = `${API_URL}/${newEndpoint}`;

  try {
    const response = await client.post(url, payload, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
