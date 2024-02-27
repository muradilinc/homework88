import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Post from '../models/Post';
import { imagesUpload } from '../helper/multer';
import mongoose from 'mongoose';

const postsRouter = express.Router();

postsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
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

export default postsRouter;
