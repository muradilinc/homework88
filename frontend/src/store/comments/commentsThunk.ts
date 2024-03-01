import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import axiosApi from '../../http/axiosApi.ts';
import { RootState } from '../../app/store.ts';

interface CommentData {
  post: string;
  text: string;
}

export const createComment = createAsyncThunk<
  void,
  CommentData,
  { state: RootState }
>('comments/createComments', async ({ post, text }, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.post(
    '/comments',
    {
      post,
      text,
    },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    },
  );
});

export const getCommentsByPost = createAsyncThunk<Comment[], string>(
  'comments/getComments',
  async (id) => {
    const response = await axiosApi.get(`/comments/${id}`);
    return response.data;
  },
);
