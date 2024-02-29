import { useEffect } from 'react';
import PostsItem from '../../components/Posts/PostsItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectSinglePost,
  selectSinglePostLoading,
} from '../../store/posts/postsSlice.ts';
import { useParams } from 'react-router-dom';
import { getPost } from '../../store/posts/postsThunk.ts';
import Comments from '../../components/Comments/Comments.tsx';

const PostPage = () => {
  const post = useAppSelector(selectSinglePost);
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSinglePostLoading);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (loading || !post) {
    return null;
  }

  return (
    <div>
      <PostsItem post={post} />
      <Comments postId={id} />
    </div>
  );
};

export default PostPage;
