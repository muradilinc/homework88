import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getCommentsByPost } from '../../store/comments/commentsThunk.ts';
import { selectComments } from '../../store/comments/commentsSlice.ts';
import FormComment from './FormComment.tsx';

interface Props {
  postId: string;
}

const Comments: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(getCommentsByPost(postId));
  }, [dispatch, postId]);

  return (
    <div className="my-5">
      <FormComment />
      {comments.map((comment) => (
        <div>
          <h4>{comment.author.username}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
