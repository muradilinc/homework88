import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Comment from '../models/Comment';
import mongoose from 'mongoose';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const comment = new Comment({
      author: req.user?._id,
      post: req.body.post,
      text: req.body.text,
      datetime: new Date().toISOString(),
    });

    await comment.save();
    return res.send(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

commentsRouter.get('/:id', async (req, res, next) => {
  try {
    const results = await Comment.find({ post: req.params.id }).populate(
      'author',
      'username',
    );
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

export default commentsRouter;
