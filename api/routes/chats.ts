import client from "../client";

const API_PATH = "/chats";

export interface ChatChannel {
  cid: string | null;
  uuid: string | null;
}

export const FetchShowChatChannel = async (
  userId: number,
  tokenApi: string
): Promise<{
  [key: string]: ChatChannel;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(`${API_PATH}/show`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchShowLobbyChatChannel = async (
  lobbyId: number,
  tokenApi: string
): Promise<{
  [key: string]: ChatChannel;
}> => {
  try {
    const response = await client.get(`${API_PATH}/show/lobby/${lobbyId}`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchChatChannelInfo = async (
  uuid: string,
  tokenApi: string
): Promise<{
  data: {
    type: string;
    uuid: string;
  };
  message: string;
}> => {
  try {
    const response = await client.get(`${API_PATH}/${uuid}/info`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchChathannelHeaderByUuid = async (
  uuid: string,
  tokenApi: string
): Promise<{
  image: string;
  title: string;
  subtitle?: string;
  lastMessage?: string;
}> => {
  try {
    const response = await client.get(`${API_PATH}/${uuid}/header`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchShowGuildChatChannel = async (
  guildId: number,
  tokenApi: string
): Promise<{
  [key: string]: ChatChannel;
}> => {
  try {
    const response = await client.get(`${API_PATH}/show/guild/${guildId}`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateUsersMessagingChannel = async (
  userId: number,
  tokenApi: string
): Promise<ChatChannel> => {
  try {
    const response = await client.post(
      `${API_PATH}/${userId}/create`,
      {
        userId,
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
