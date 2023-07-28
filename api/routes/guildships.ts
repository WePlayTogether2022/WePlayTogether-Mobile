import { UpdateGuildUserDto } from "@/models/dto/GuildsUsers";
import { SmallUser } from "@/models/project/SmallUser";
import client from "../client";

const API_PATH = "/guildships";

export interface Guildship {
  [key: string]: GuildshipStatus;
}

export interface GuildshipStatus {
  member: boolean;
  incomingGuildInvitationRequest: boolean;
}

export const FetchShowGuildShip = async (
  guildId: number,
  tokenApi: string
): Promise<Guildship> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.post(`${API_PATH}/show`, { guildId });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGuildUsersCount = async (
  guildId: number,
  tokenApi: string
): Promise<{
  count: number;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(`${API_PATH}/${guildId}/users/count`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGuildUserWebFormData = async (
  guildId: number,
  userId: number,
  tokenApi: string
): Promise<{
  formData: {
    memberSince: string; // DD/MM/YYYY
    isProPlayer: boolean;
    isContentCreator: boolean;
  };
  message: string;
}> => {
  try {
    const response = await client.get(
      `${API_PATH}/${guildId}/edit/${userId}/web_form_data`,
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

export const FetchGuildUsers = async (
  guildId: number | string | undefined,
  tokenApi: string,
  usernameFilter: string | null,
  onlyProPlayers: boolean,
  onlyContentCreators: boolean,
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
    if (!guildId) throw new Error("Guild ID is undefined");
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    let url = `${API_PATH}/${guildId}/users?pageNumber=${pageNumber}`;
    if (usernameFilter && usernameFilter.length > 0) {
      url += `&query=${usernameFilter}`;
    }

    if (onlyProPlayers) {
      url += `&onlyProPlayers=${onlyProPlayers ? 1 : 0}`;
    }

    if (onlyContentCreators) {
      url += `&onlyContentCreators=${onlyContentCreators ? 1 : 0}`;
    }

    const response = await client.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchAvailableUsers = async (
  guildId: number | string | undefined,
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
    if (!guildId) throw new Error("Guild ID is undefined");

    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    let url = `${API_PATH}/${guildId}/available_users?pageNumber=${pageNumber}`;
    if (usernameFilter && usernameFilter.length > 0) {
      url += `&query=${usernameFilter}`;
    }

    const response = await client.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SendGuildInvitation = async (
  guildId: number,
  userId: number,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/create/${userId}`,
      {
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

export const AcceptGuildInvitation = async (
  guildId: number,
  tokenAPI: string
): Promise<{
  message: string;
  guildshipStatus: GuildshipStatus;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${guildId}/accept`,
      {
        guildId,
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

export const DeclineGuildInvitation = async (
  guildId: number,
  tokenAPI: string
): Promise<{
  message: string;
  guildshipStatus: GuildshipStatus;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${guildId}/decline`,
      {
        guildId,
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

export const LeaveGuild = async (
  guildId: number,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${guildId}/leave`,
      {
        guildId,
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

export const KickUserFromGuild = async (
  guildId: number,
  userId: number,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${guildId}/kick/${userId}`,
      {
        guildId,
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

export const UpdateGuildUser = async (
  guildId: number,
  userId: number,
  data: UpdateGuildUserDto,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/${guildId}/edit/${userId}`,
      data,
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
