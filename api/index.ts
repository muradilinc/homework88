import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import commentsRouter from './routes/comments';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('connecting port: ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();
