import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getCommentsByPost } from '../../store/comments/commentsThunk.ts';
import {
  selectComments,
  selectCommentsLoading,
} from '../../store/comments/commentsSlice.ts';
import FormComment from './FormComment.tsx';
import { selectUser } from '../../store/users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import dayjs from 'dayjs';
import Spinner from '../Spinner/Spinner.tsx';

interface Props {
  postId: string;
}

const Comments: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const loading = useAppSelector(selectCommentsLoading);

  useEffect(() => {
    dispatch(getCommentsByPost(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="my-5">
      {user ? (
        <FormComment />
      ) : (
        <button
          onClick={() => navigate(routes.signIn)}
          className="capitalize px-[10px] py-[5px] border border-black rounded-[30px]"
        >
          add comment
        </button>
      )}
      <div className="flex flex-col gap-y-3 my-5">
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-col gap-y-[10px]">
            <h4 className="text-[#0F1A1C] font-bold">
              {comment.author.username}{' '}
              <span className="text-[#576F76] font-light">
                • {dayjs(comment.datetime).format('DD.MM.YYYY HH:MM')}
              </span>
            </h4>
            <p className="text-sm">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
