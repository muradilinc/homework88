import mongoose from 'mongoose';
import { Post } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: async function (this: Post, value: string) {
        if (!this.image && !value) {
          if (value === null) {
            return false;
          }
          return false;
        }
      },
      message: 'Description is required!',
    },
  },
  image: {
    type: String,
    validate: {
      validator: async function (this: Post, value: string) {
        if (!this.description && !value) {
          if (value === null) {
            return false;
          }
          return false;
        }
      },
    },
    message: 'Image is required!',
  },
  datetime: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: "Author doesn't exist!",
    },
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
