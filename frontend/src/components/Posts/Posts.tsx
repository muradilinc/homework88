import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectPosts,
  selectPostsLoading,
} from '../../store/posts/postsSlice.ts';
import { getPosts } from '../../store/posts/postsThunk.ts';
import PostsItem from './PostsItem.tsx';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import Spinner from '../Spinner/Spinner.tsx';

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {posts.map((post) => (
        <Link key={post._id} to={routes.post + '/' + post._id}>
          <PostsItem post={post} />
        </Link>
      ))}
    </>
  );
};

export default Posts;
