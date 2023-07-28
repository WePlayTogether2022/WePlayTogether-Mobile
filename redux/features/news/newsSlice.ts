import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NewsArticle } from "../../../models/project/NewsArticle";

export interface NewsState {
  news: NewsArticle | null;
}

const initialState: NewsState = {
  news: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsArticle: (state, action: PayloadAction<NewsArticle | null>) => {
      state.news = action.payload;
    },
  },
});

export const { setNewsArticle } = newsSlice.actions;

export default newsSlice.reducer;
