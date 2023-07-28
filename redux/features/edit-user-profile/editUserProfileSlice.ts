import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  queryChangeCountry: string;
}

const initialState: ChatState = {
  queryChangeCountry: "",
};

export const editUserProfileSlice = createSlice({
  name: "edit-user-profile",
  initialState,
  reducers: {
    setQueryChangeCountry: (state, action: PayloadAction<string>) => {
      state.queryChangeCountry = action.payload;
    },
  },
});

export const { setQueryChangeCountry } = editUserProfileSlice.actions;

export default editUserProfileSlice.reducer;
