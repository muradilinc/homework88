import mongoose from 'mongoose';
import User from './models/User';
import config from './config';
import crypto from 'crypto';
import Post from './models/Post';
import Comment from './models/Comment';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['posts', 'comments', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user1, user2] = await User.create(
    {
      username: 'muradil',
      password: 'satoru',
      token: crypto.randomUUID(),
    },
    {
      username: 'godjo',
      password: 'satoru',
      token: crypto.randomUUID(),
    },
  );

  const [post1, post2, post3] = await Post.create(
    {
      title: 'What is vac vac is not real',
      image: 'fixtures/cs2bug.webp',
      datetime: new Date().toISOString(),
      author: user1,
    },
    {
      title: 'Sticker craft I made',
      image: 'fixtures/cs2sticker.webp',
      datetime: new Date().toISOString(),
      author: user1,
    },
    {
      title: 'Getting 270 FPS but still doesnt feel smooth?',
      description:
        "I'm thinking it is caused by internet lag, but my game feels like shit. If it is caused by internet, is there any way to reduce my lag without doing anything with the router itself? (The contract ends this year so I'm going to wait for getting a new modem)",
      datetime: new Date().toISOString(),
      author: user2,
    },
  );

  await Comment.create(
    {
      author: user1,
      post: post1,
      text: 'lol check!',
      datetime: new Date().toISOString(),
    },
    {
      author: user2,
      post: post2,
      text: 'its very cool!',
      datetime: new Date().toISOString(),
    },
    {
      author: user1,
      post: post2,
      text: 'its very amazing!',
      datetime: new Date().toISOString(),
    },
    {
      author: user2,
      post: post3,
      text: 'idk because u have slow PC?',
      datetime: new Date().toISOString(),
    },
  );

  await db.close();
};

void run();
