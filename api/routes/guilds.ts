import { CreateGuildDto, UpdateGuildDto } from "@/models/dto/Guilds";
import client, { API_URL, ErrorResponseType } from "../client";
import * as FileSystem from "expo-file-system";

const API_PATH = "/guilds";

export const FetchCanCreateGuild = async ({
  queryKey,
}: any): Promise<{
  message: string;
  canCreateGuild: boolean;
}> => {
  const [_, tokenAPI] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/can-create`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateGuild = async (
  data: CreateGuildDto,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await FileSystem.uploadAsync(
      `${API_URL}${API_PATH}`,
      data.logoUrl,
      {
        fieldName: "logo",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
        parameters: {
          ...(data.name && { name: data.name }),
          ...(data.description && { description: data.description }),
          ...(data.websiteUrl && { websiteUrl: data.websiteUrl }),
          ...(data.countryId && { countryId: data.countryId.toString() }),
        },
      }
    );
    if (response.status > 299) {
      let error: ErrorResponseType = JSON.parse(response.body);
      throw error;
    }

    return JSON.parse(response.body);
  } catch (error) {
    throw error;
  }
};

export const UpdateGuild = async (
  data: UpdateGuildDto,
  tokenAPI: string,
  guildId: number
): Promise<{
  message: string;
}> => {
  try {
    // Controllo se vuole aggiornare anche il logo
    if (data.logoUrl && data.logoUrl.length > 0) {
      const response = await FileSystem.uploadAsync(
        `${API_URL}${API_PATH}/${guildId}`,
        data.logoUrl,
        {
          fieldName: "logo",
          httpMethod: "PUT",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Authorization: `Bearer ${tokenAPI}`,
          },
          parameters: {
            ...(data.name && { name: data.name }),
            ...(data.description && { description: data.description }),
            ...(data.websiteUrl && { websiteUrl: data.websiteUrl }),
            ...(data.countryId && { countryId: data.countryId.toString() }),
          },
        }
      );

      return JSON.parse(response.body);
    } else {
      const response = await client.put(
        `${API_PATH}/${guildId}`,
        {
          ...(data.name && { name: data.name }),
          ...(data.description && { description: data.description }),
          ...(data.websiteUrl && { websiteUrl: data.websiteUrl }),
          ...(data.countryId && { countryId: data.countryId }),
        },
        {
          headers: {
            Authorization: `Bearer ${tokenAPI}`,
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const DeleteGuild = async (
  guildId: number,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  let url = `${API_PATH}/${guildId}`;

  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
