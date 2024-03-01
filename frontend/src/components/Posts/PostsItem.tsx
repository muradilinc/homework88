import React from 'react';
import dayjs from 'dayjs';
import { BASE_URL } from '../../constants/links.ts';
import discussion from '../../assets/discusion.png';
import { Post } from '../../types';

interface Props {
  post: Post;
}

const PostsItem: React.FC<Props> = ({ post }) => {
  const singlePost = !location.pathname.includes('posts');
  return (
    <div className={singlePost ? 'border-gray-500 border-t-[1px]' : ''}>
      <div
        className={`my-[2px] ${singlePost ? 'hover:bg-gray-200 rounded-[10px] px-[10px]' : ''}`}
      >
        <div>
          <p className="text-[#2A3C42]">
            {post.author.username}{' '}
            <span className="text-[#576F76]">
              • {dayjs(post.datetime).format('DD.MM.YYYY hh:mm')}
            </span>
          </p>
        </div>
        {post.image ? (
          <>
            <h4 className="text-lg font-semibold text-black">{post.title}</h4>
            <img
              className="object-contain h-[550px] w-full bg-black bg-opacity-100 rounded-[10px]"
              src={BASE_URL + '/' + post.image}
              alt="ImagePost"
            />
          </>
        ) : (
          <div
            className={
              singlePost ? 'flex gap-x-[10px] py-[10px]' : 'flex flex-col'
            }
          >
            {singlePost ? (
              <img className="w-[100px]" src={discussion} alt="discussion" />
            ) : null}
            <h4 className="text-lg font-semibold text-black">{post.title}</h4>
            {!singlePost ? (
              <p className="text-sm font-light dark:text-gray-300">
                {post.description}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsItem;
