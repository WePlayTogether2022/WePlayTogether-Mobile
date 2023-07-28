import { UpdateGuildUserDto } from "../@/models/dto/GuildsUsers";
import { GuildProfile } from "../@/models/profiles/GuildProfile";
import { GetstreamChannel } from "../@/models/resources/GetstreamChannel";
import { GuildInvitation } from "../@/models/resources/GuildInvitation";
import { GuildUser } from "../@/models/resources/GuildUser";
import { UserAvatar, UserBanner } from "../@/models/resources/User";
import client from "../../client";

const API_PATH = "/web";
const PATH_GUILD = "guild";

export const FetchGuildProfileByGuildId = async ({
  queryKey,
}: any): Promise<GuildProfile> => {
  const [_, guildId, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/${PATH_GUILD}/${guildId}`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGuildUsersByGuildId = async (
  guildId: number,
  tokenAPI: string,
  usernameFilter: string | null,
  page?: number
): Promise<{
  params: any;
  data: {
    results: GuildUser[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  let url = `${API_PATH}/${PATH_GUILD}/${guildId}/users`;

  if (page && page > 0) url += `?pageNumber=${page}`;
  else url += `?pageNumber=1`;

  if (usernameFilter && usernameFilter.length > 0)
    url += `&username=${usernameFilter}`;

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGuildPlayersByGuildId = async (
  guildId: number,
  tokenAPI: string,
  page?: number
): Promise<{
  params: any;
  data: {
    results: GuildUser[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  let url = `${API_PATH}/${PATH_GUILD}/${guildId}/users/players`;
  if (page && page > 0) url += `?pageNumber=${page}`;
  else url += `?pageNumber=1`;

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGuildContentCreatorsByGuildId = async (
  guildId: number,
  tokenAPI: string,
  page?: number
): Promise<{
  params: any;
  data: {
    results: GuildUser[];
    total: number;

    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  let url = `${API_PATH}/${PATH_GUILD}/${guildId}/users/content-creators`;

  if (page && page > 0) url += `?pageNumber=${page}`;
  else url += `?pageNumber=1`;

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchGuildIsFull = async (
  id: number,
  tokenAPI: string
): Promise<{
  message: string;
  isFull: boolean;
}> => {
  try {
    const response = await client.get(
      `${API_PATH}/${PATH_GUILD}/${id}/is-full`,
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
