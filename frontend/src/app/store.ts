import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../store/posts/postsSlice.ts';
import { commentsReducer } from '../store/comments/commentsSlice.ts';
import { usersReducer } from '../store/users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
