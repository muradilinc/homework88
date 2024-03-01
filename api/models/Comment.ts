import mongoose from 'mongoose';
import User from './User';
import Post from './Post';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: "User doesn't exist!",
    },
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const post = await Post.findById(value);
        return Boolean(post);
      },
      message: "Post doesn't exist!",
    },
  },
  text: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
