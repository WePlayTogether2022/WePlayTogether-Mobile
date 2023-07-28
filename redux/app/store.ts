import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice";
import newsReducer from "../features/news/newsSlice";
import editUserProfileReducer from "../features/edit-user-profile/editUserProfileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    news: newsReducer,
    editUserProfile: editUserProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
