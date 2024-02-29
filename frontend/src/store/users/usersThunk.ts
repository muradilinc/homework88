import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../http/axiosApi';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  AuthResponse,
  ValidationError,
} from '../../types';

export const register = createAsyncThunk<
  AuthResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<AuthResponse>(
      '/users',
      registerMutation,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<AuthResponse>(
      '/users/sessions',
      loginMutation,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});
