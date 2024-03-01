import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../store/posts/postsSlice.ts';
import { commentsReducer } from '../store/comments/commentsSlice.ts';
import { usersReducer } from '../store/users/usersSlice.ts';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  REHYDRATE,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';

const usersPersistConfig = {
  key: 'store:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
