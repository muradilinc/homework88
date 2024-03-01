import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Post from '../models/Post';
import { imagesUpload } from '../helper/multer';
import mongoose from 'mongoose';
import Comment from '../models/Comment';

const postsRouter = express.Router();

postsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const post = new Post({
        title: req.body.title,
        description: req.body.description || null,
        image: req.file ? req.file.filename : null,
        datetime: new Date().toISOString(),
        author: req.user?._id,
      });
      await post.save();
      return res.send({ message: 'Post published!', post });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }
      return next(error);
    }
  },
);

postsRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Post.find()
      .sort({ datetime: -1 })
      .populate('author', 'username');

    const postsWithCommentCount = await Promise.all(
      results.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return { ...post.toObject(), commentCount };
      }),
    );

    return res.send(postsWithCommentCount);
  } catch (error) {
    return next(error);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const results = await Post.findById(req.params.id).populate(
      'author',
      'username',
    );
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

export default postsRouter;
