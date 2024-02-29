import { Comment } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { getCommentsByPost } from './commentsThunk.ts';

interface CommentsState {
  comments: Comment[];
  commentsLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  commentsLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsByPost.pending, (state) => {
      state.commentsLoading = true;
    });
    builder.addCase(
      getCommentsByPost.fulfilled,
      (state, { payload: comments }: PayloadAction<Comment[]>) => {
        state.commentsLoading = false;
        state.comments = comments;
      },
    );
    builder.addCase(getCommentsByPost.rejected, (state) => {
      state.commentsLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
