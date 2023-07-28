import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse, UserRedux } from "../../../api/routes/auth";

export interface UserState {
  isLoggedIn: boolean;
  tokenApi: string;

  getStreamToken: string | null;
  unreadGetStreamChannelsCount: number;
  isConnectedWithGetStream: boolean;

  user: UserRedux | null;
  isChanged: boolean;
}

export interface LoginPayload {
  tokenApi: string;
  user: UserRedux;
  getStreamToken: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  tokenApi: "",

  getStreamToken: null,
  unreadGetStreamChannelsCount: 0,
  isConnectedWithGetStream: false,

  user: null,
  isChanged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoggedIn = true;
      state.tokenApi = action.payload.tokenApi.token;

      state.user = action.payload.user;
      state.getStreamToken = action.payload.getStreamToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.tokenApi = "";
      state.getStreamToken = "";
      state.isConnectedWithGetStream = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<UserRedux>) => {
      state.user = action.payload;
      state.isChanged = false;
    },
    updateIsChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },

    connectWithGetStream: (state, action: PayloadAction<number>) => {
      state.unreadGetStreamChannelsCount = action.payload;
      state.isConnectedWithGetStream = true;
    },
  },
});

export const {
  login,
  logout,

  updateUser,
  updateIsChanged,

  connectWithGetStream,
} = userSlice.actions;

export default userSlice.reducer;
