import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'user registered!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidatorError) {
      return res.status(422).send(error);
    }
    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(422).send({ error: 'Username or Password not found!' });
    }

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(422).send({ error: 'Username or Password not found!' });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'User login!', user });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
