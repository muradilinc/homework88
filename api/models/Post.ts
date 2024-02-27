import mongoose from 'mongoose';
import { Post } from '../types';

const Schema = mongoose.Schema;

const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return !this.image || value;
      },
      message: 'Description is required!',
    },
  },
  image: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return !this.description || value;
      },
    },
    message: 'Image is required!',
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
