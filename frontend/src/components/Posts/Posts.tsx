import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPosts } from '../../store/posts/postsSlice.ts';
import { getPosts } from '../../store/posts/postsThunk.ts';
import PostsItem from './PostsItem.tsx';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/route.ts';

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {posts.map((post) => (
        <Link to={routes.post + '/' + post._id}>
          <PostsItem post={post} />
        </Link>
      ))}
    </>
  );
};

export default Posts;
