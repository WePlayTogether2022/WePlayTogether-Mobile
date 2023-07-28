import { ChangePasswordDto } from "@/models/dto/Auth";
import { SmallUser } from "@/models/project/SmallUser";
import { Country } from "@/models/resources/Country";
import { UserAvatar, UserBanner } from "@/models/resources/User";
import client, { API_URL } from "../client";
import * as FileSystem from "expo-file-system";

const API_PATH = "/accounts";

export const FetchEditWebFormData = async (
  tokenApi: string
): Promise<{
  formData: {
    biography: string | null;
    email: string;
    fullName: string | null;

    phoneNumber: string | null;

    emailVerified: boolean;
    phoneNumberVerified: boolean;

    username: string;
    canUpdateUsername: boolean;
    lastUsernameChange: Date | null;
    nextUsernameChange: Date | null;

    country: Country | null;
  };
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(`${API_PATH}/edit/web_form_data`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchEditWebProfilePic = async (
  tokenApi: string
): Promise<{
  data: {
    avatar: {
      url: string;
      changeAvatarActionsCancelCta: string;
      changeAvatarActionsHeader: string;
      changeAvatarActionsSubheader: string | null;

      changeAvatarActionsUpload: string;
      changeAvatarActionsRemove: string | null;
    };
    banner: {
      url: string;
      changeBannerActionsCancelCta: string;
      changeBannerActionsHeader: string;
      changeBannerActionsSubheader: string | null;

      changeBannerActionsUpload: string;
      changeBannerActionsRemove: string | null;
    };
  };
  message: string;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.get(`${API_PATH}/edit/web_profile_pic`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchSettingsWebInfo = async (
  tokenApi: string
): Promise<{
  webInfo: {
    privateAccount: boolean;
  };
  message: string;
}> => {
  try {
    const response = await client.get(`${API_PATH}/settings/web_info`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchPrivacyBlockedAccounts = async (
  tokenApi: string,
  page?: number
): Promise<{
  params: any;
  data: {
    results: SmallUser[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;

  try {
    const response = await client.get(
      `${API_PATH}/settings/privacy/blocked_accounts?pageNumber=${pageNumber}`,
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

export const SetIsPrivateAccount = async (
  isPrivate: boolean,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/set_private`,
      {
        isPrivate,
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

export const WebChangeAvatar = async (
  tokenApi: string,
  fileUri?: string
): Promise<{
  hasAvatarPic: boolean;
  changedProfile: boolean;
  avatar: UserAvatar;
  message: string;
}> => {
  if (!fileUri) {
    // Rimuovo il file
    try {
      const { data } = await client.post(
        `${API_PATH}/web_change_avatar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenApi}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const response = await FileSystem.uploadAsync(
        `${API_URL}${API_PATH}/web_change_avatar`,
        fileUri,
        {
          fieldName: "avatar",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Authorization: `Bearer ${tokenApi}`,
          },
        }
      );

      let data = JSON.parse(response.body);

      if (response.status !== 200) {
        throw new Error("Ops! Something went wrong.");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const WebChangeBanner = async (
  tokenApi: string,
  fileUri?: string
): Promise<{
  hasBannerPic: boolean;
  changedProfile: boolean;
  banner: UserBanner;
  message: string;
}> => {
  if (!fileUri) {
    // Rimuovo il file
    try {
      const { data } = await client.post(
        `${API_PATH}/web_change_banner`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenApi}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const response = await FileSystem.uploadAsync(
        `${API_URL}${API_PATH}/web_change_banner`,
        fileUri,
        {
          fieldName: "banner",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Authorization: `Bearer ${tokenApi}`,
          },
        }
      );

      let data = JSON.parse(response.body);

      if (response.status !== 200) {
        throw new Error("Ops! Something went wrong.");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const EditCountry = async (
  countryId: number,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/edit/country`,
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

export const EditUsername = async (
  username: string,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/edit/username`,
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

export const EditFullName = async (
  fullName: string | null,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/edit/full_name`,
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

export const EditBio = async (
  bio: string | null,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.put(
      `${API_PATH}/edit/bio`,
      {
        biography: bio,
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

export const FetchSettingsSecurityWebInfo = async (
  tokenApi: string
): Promise<{
  webInfo: {
    oldPasswordRequired: boolean;
  };
  message: string;
}> => {
  try {
    const response = await client.get(
      `${API_PATH}/settings/security/web_info`,
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

export const WebChangePassword = async (
  changePasswordDto: ChangePasswordDto,
  tokenApi: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/web_change_password`,
      changePasswordDto,
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

export const SendAccountRecoveryEmail = async (
  emailOrUsername: string
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(`${API_PATH}/account_recovery`, {
      emailOrUsername,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
