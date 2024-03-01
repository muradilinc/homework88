export interface Author {
  username: string;
}
export interface Post {
  _id: string;
  title: string;
  author: Author;
  description?: string;
  image?: string;
  datetime: string;
}

export interface Comment {
  _id: string;
  author: Author;
  text: string;
  datetime: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface GlobalError {
  error: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface PostMutation {
  title: string;
  description?: string;
  image?: File | null;
}
