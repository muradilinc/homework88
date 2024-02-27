import { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;

export interface Post {
  title: string;
  description: string | null;
  image: string | null;
  datetime: Date;
  author: string;
}
