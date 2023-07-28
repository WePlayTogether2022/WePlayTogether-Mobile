import client, { API_URL } from "../client";
import * as FileSystem from "expo-file-system";
import { UserRedux } from "./auth";
import { User } from "@/models/resources/User";

const API_PATH = "/users";

export const FetchUserIdFromUsername = async (
  username: string,
  tokenAPI: string
): Promise<{
  id: number;
}> => {
  try {
    const response = await client.get(`${API_PATH}/get_user_id/${username}`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchMeStore = async (tokenAPI: string): Promise<UserRedux> => {
  try {
    const response = await client.get(`${API_PATH}/me/store`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateEditProfileRemoveAvatar = async (
  tokenAPI: string
): Promise<UserRedux> => {
  try {
    const response = await client.delete(`${API_PATH}/profile/avatar`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateEditProfileBanner = async (
  tokenAPI: string,
  fileUri: string
): Promise<any> => {
  try {
    const response = await FileSystem.uploadAsync(
      `${API_URL}${API_PATH}/profile/banner`,
      fileUri,
      {
        fieldName: "banner",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
      }
    );

    return response.body;
  } catch (error) {
    throw error;
  }
};

export const UpdateEditProfileRemoveBanner = async (
  tokenAPI: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.delete(`${API_PATH}/profile/banner`, {
      headers: {
        Authorization: `Bearer ${tokenAPI}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMeCountry = async (
  countryId: number,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/me/country`,
      {
        countryId,
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

export const UpdateMeUsername = async (
  username: string,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/me/username`,
      {
        username,
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

export const UpdateMeFullName = async (
  fullName: string | null,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/me/fullname`,
      {
        fullName,
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

export const UpdateMeBiography = async (
  biography: string | null,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/me/biography`,
      {
        biography,
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
