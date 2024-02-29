import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi.ts';
import { Post } from '../../types';

export const getPosts = createAsyncThunk<Post[]>('posts/getAll', async () => {
  const response = await axiosApi.get<Post[]>('/posts');
  return response.data;
});

export const getPost = createAsyncThunk<Post, string>(
  'posts/getOne',
  async (id) => {
    const response = await axiosApi.get<Post>(`/posts/${id}`);
    if (!response.data) {
      throw new Error('Not found!');
    }

    return response.data;
  },
);
