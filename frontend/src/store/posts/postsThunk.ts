import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi.ts';
import { Post, PostMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const createPost = createAsyncThunk<
  void,
  PostMutation,
  { state: RootState }
>('posts/create', async (post, { getState }) => {
  const token = getState().users.user?.token;
  const formData = new FormData();
  formData.append('title', post.title);
  if (post.description && post.description.length !== 0) {
    formData.append('description', post.description);
  } else if (post.image) {
    formData.append('image', post.image);
  }

  await axiosApi.post('/posts', formData, {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });
});

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
