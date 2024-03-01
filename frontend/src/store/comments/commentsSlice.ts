import { Comment } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createComment, getCommentsByPost } from './commentsThunk.ts';

interface CommentsState {
  comments: Comment[];
  commentsLoading: boolean;
  createCommentsLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  commentsLoading: false,
  createCommentsLoading: false,
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
    builder.addCase(createComment.pending, (state) => {
      state.createCommentsLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.createCommentsLoading = false;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.createCommentsLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.commentsLoading;
export const selectCreateCommentsLoading = (state: RootState) =>
  state.comments.createCommentsLoading;
