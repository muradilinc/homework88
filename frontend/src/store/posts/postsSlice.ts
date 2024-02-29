import { Post } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { getPost, getPosts } from './postsThunk.ts';

interface PostsState {
  posts: Post[];
  post: Post | null;
  postsLoading: boolean;
  postsSingleLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  postsLoading: false,
  postsSingleLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.postsLoading = true;
    });
    builder.addCase(
      getPosts.fulfilled,
      (state, { payload: posts }: PayloadAction<Post[]>) => {
        state.postsLoading = false;
        state.posts = posts;
      },
    );
    builder.addCase(getPosts.rejected, (state) => {
      state.postsLoading = false;
    });
    builder.addCase(getPost.pending, (state) => {
      state.postsSingleLoading = true;
    });
    builder.addCase(
      getPost.fulfilled,
      (state, { payload: post }: PayloadAction<Post>) => {
        state.postsSingleLoading = false;
        state.post = post;
      },
    );
    builder.addCase(getPost.rejected, (state) => {
      state.postsSingleLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectSinglePost = (state: RootState) => state.posts.post;
export const selectSinglePostLoading = (state: RootState) =>
  state.posts.postsSingleLoading;
