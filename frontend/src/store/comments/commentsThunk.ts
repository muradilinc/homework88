import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import axiosApi from '../../http/axiosApi.ts';

export const getCommentsByPost = createAsyncThunk<Comment[], string>(
  'comments/getComments',
  async (id) => {
    const response = await axiosApi.get(`/comments/${id}`);
    return response.data;
  },
);
