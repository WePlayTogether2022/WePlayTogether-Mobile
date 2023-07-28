import { CreateLobbyDto, UpdateLobbyDto } from "@/models/dto/Lobbies";
import { SmallUser } from "@/models/project/SmallUser";
import { Console } from "@/models/resources/Console";
import { Game } from "@/models/resources/Game";
import { Lobby, LobbyImage } from "@/models/resources/Lobby";
import { LobbyType } from "@/models/resources/LobbyType";
import client, { API_URL, ErrorResponseType } from "../client";
import * as FileSystem from "expo-file-system";

const API_PATH = "/lobbies";

export const FetchLobbies = async (
  tokenApi: string,
  page?: number,
  gameIds?: number[],
  consoleIds?: number[],
  lobbyTypeIds?: number[]
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: Lobby[];
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;

  var url = `${API_PATH}/get_lobbies?pageNumber=${pageNumber}`;

  let where = {};
  if (gameIds && gameIds.length > 0) {
    where = {
      ...where,
      gameId: {
        $in: gameIds,
      },
    };
  }

  if (consoleIds && consoleIds.length > 0) {
    where = {
      ...where,
      consoleId: {
        $in: consoleIds,
      },
    };
  }

  if (lobbyTypeIds && lobbyTypeIds.length > 0) {
    where = {
      ...where,
      lobbyTypeId: {
        $in: lobbyTypeIds,
      },
    };
  }

  let body = {
    ResourceFilters: {
      eager: {
        $where: where,
      },
    },
  };

  try {
    const response = await client.post(url, body, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchLobbyInfoByLobbyId = async (
  id: number,
  tokenApi: string
): Promise<{
  game: Game;
  console: Console | null;
  lobbyType: LobbyType;
  users: SmallUser[];
  message: string;
}> => {
  try {
    const response = await client.get(`${API_PATH}/${id}/info`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchEditLobbyWebFormData = async (
  id: number,
  tokenApi: string
): Promise<{
  message: string;
  formData: {
    title: string;
    description: string | null;
    maxPlayers: number;
    image: LobbyImage;
  };
}> => {
  try {
    const response = await client.get(`${API_PATH}/${id}/edit/web_form_data`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateLobby = async (
  data: CreateLobbyDto,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await FileSystem.uploadAsync(
      `${API_URL}${API_PATH}`,
      data.imageUrl,
      {
        fieldName: "image",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
        parameters: {
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.lobbyTypeId && { lobbyTypeId: data.lobbyTypeId.toString() }),
          ...(data.gameId && { gameId: data.gameId.toString() }),
          ...(data.consoleId && { consoleId: data.consoleId.toString() }),
          ...(data.maxPlayers && { maxPlayers: data.maxPlayers.toString() }),
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

export const UpdateLobby = async (
  id: number,
  data: UpdateLobbyDto,
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    // Controllo se vuole aggiornare anche l'immagine
    if (data.imageUrl && data.imageUrl.length > 0) {
      const response = await FileSystem.uploadAsync(
        `${API_URL}${API_PATH}/${id}`,
        data.imageUrl,
        {
          fieldName: "image",
          httpMethod: "PUT",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Authorization: `Bearer ${tokenAPI}`,
          },
          parameters: {
            ...(data.title && { title: data.title }),
            ...(data.description && { description: data.description }),
            ...(data.maxPlayers && { maxPlayers: data.maxPlayers.toString() }),
          },
        }
      );

      return JSON.parse(response.body);
    } else {
      const response = await client.put(
        `${API_PATH}/${id}`,
        {
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.maxPlayers && { maxPlayers: data.maxPlayers.toString() }),
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

export const DeleteLobby = async (
  id: number,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const url = `${API_PATH}/${id}`;

    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
