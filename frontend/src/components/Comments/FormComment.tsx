import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  createComment,
  getCommentsByPost,
} from '../../store/comments/commentsThunk.ts';
import { selectCreateCommentsLoading } from '../../store/comments/commentsSlice.ts';
import Spinner from '../Spinner/Spinner.tsx';
import { toast } from 'react-toastify';

const FormComment = () => {
  const { id } = useParams() as { id: string };
  const [comment, setComment] = useState('');
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [showPanel, setShowPanel] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateCommentsLoading);

  const handleClick = () => {
    if (textArea.current) {
      textArea.current.click();
    }
    setShowPanel(true);
  };

  const handleCancel = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowPanel(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await dispatch(createComment({ post: id, text: comment })).unwrap();
      await dispatch(getCommentsByPost(id)).unwrap();
      setShowPanel(false);
      setComment('');
      toast.success('comment published!');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form
      onClick={handleClick}
      onSubmit={handleSubmit}
      className="flex flex-col p-[5px] gap-y-[10px] rounded-md border border-gray-200 outline-none disabled:bg-gray-50 dark:bg-blue-50 dark:text-gray-800"
    >
      <textarea
        ref={textArea}
        className="w-full pl-4 outline-0"
        placeholder="Add to comment"
        value={comment}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setComment(event.target.value)
        }
      />
      {showPanel ? (
        <div className="flex justify-end gap-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 p-[5px] px-[10px] capitalize rounded-[30px] hover:bg-gray-400"
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-[#0045AC] p-[5px] px-[10px] capitalize text-white rounded-[30px] hover:bg-[#003584]"
          >
            comment
          </button>
        </div>
      ) : null}
    </form>
  );
};

export default FormComment;
