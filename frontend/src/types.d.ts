export interface Post {
  _id: string;
  title: string;
  author: {
    username: string;
  };
  description?: string;
  image?: string;
  datetime: string;
}

export interface Comment {
  _id: string;
  author: {
    username: string;
  };
  text: string;
}
