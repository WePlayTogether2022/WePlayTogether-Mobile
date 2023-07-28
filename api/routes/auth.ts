import * as Device from "expo-device";
import client from "../client";
import { Platform } from "react-native";
import { getDeviceUuid } from "@/secure-store/DeviceUuid";
import { SignUpDto } from "@/models/dto/Auth";
import { Biography } from "@/models/profiles/UserProfile";
import { Country } from "@/models/resources/Country";
import { UserAvatar } from "@/models/resources/User";

const API_PATH = "/auth";

export const AuthLogIn = async (
  emailOrUsername: string,
  password: string,
  code?: string | null
): Promise<LoginResponse> => {
  const deviceUUID = await getDeviceUuid();

  let deviceObject = {
    brand: Device.brand,
    osName: Device.osName,
    osVersion: Device.osVersion,
    modelName: Device.modelName,
    platformOs: Platform.OS,
  };

  try {
    const { data } = await client.post(
      `${API_PATH}/login`,
      {
        emailOrUsername,
        password,
        code,
        device: deviceObject,
      },
      {
        headers: {
          DeviceUuid: deviceUUID,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const AuthLogInAuthToken = async (
  authToken: string
): Promise<LoginResponse> => {
  const deviceUUID = await getDeviceUuid();

  try {
    const { data } = await client.post(
      `${API_PATH}/login/auth_token`,
      {
        authToken,
      },
      {
        headers: {
          DeviceUuid: deviceUUID,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const AuthSignUp = async (
  signUpData: SignUpDto
): Promise<LoginResponse> => {
  const deviceUUID = await getDeviceUuid();

  try {
    const { data } = await client.post(`${API_PATH}/signup`, signUpData, {
      headers: {
        DeviceUuid: deviceUUID,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const AuthLogOut = async (tokenApi: string): Promise<void> => {
  const deviceUUID = await getDeviceUuid();

  try {
    await client.post(
      `${API_PATH}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenApi}`,
          DeviceUuid: deviceUUID,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const AuthGetGetStreamToken = async (
  tokenApi: string
): Promise<{
  message: string;
  token: string;
}> => {
  try {
    const response = await client.get(`${API_PATH}/getstream/token`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface LoginResponse {
  accessToken: string;
  deviceUuid: string;
  tokenApi: TokenData;
  user: UserRedux;
  getStreamToken: string | null;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface UserRedux {
  id: number;
  uuid: string;
  username: string;
  avatar: UserAvatar;

  fullName?: string | null;
  country?: Country | null;
  biography?: Biography | null;
}
