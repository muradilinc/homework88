import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { PostMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { createPost } from '../../store/posts/postsThunk.ts';
import { toast } from 'react-toastify';
import { selectUser } from '../../store/users/usersSlice.ts';
import { selectCreatePostLoading } from '../../store/posts/postsSlice.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';

const NewPostPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [post, setPost] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });
  const [filename, setFilename] = useState('');
  const imageSelect = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState('');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreatePostLoading);

  useEffect(() => {
    if (!user) {
      return navigate(routes.signIn);
    }
  }, [dispatch, navigate, user]);

  const handleTabs = (id: number) => {
    setActiveTab(id);
  };

  const changePost = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeImageFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setFilename(files[0].name);
      setImageData(URL.createObjectURL(files[0]));
      setPost((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setPost((prevState) => ({
      ...prevState,
      image: null,
    }));
  };

  const createHandle = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createPost(post)).unwrap();
      setPost({
        title: '',
        description: '',
        image: null,
      });
      setImageData('');
      setFilename('');
      toast.success('Post created!');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="grid grid-cols-1 bg-[#DAE0E6] w-[60%] p-[20px] rounded-[5px]">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-lg"
                type="button"
                onClick={() => handleTabs(1)}
              >
                Post
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                type="button"
                onClick={() => handleTabs(2)}
              >
                Image
              </button>
            </li>
          </ul>
        </div>
        <form onSubmit={createHandle}>
          {activeTab === 1 ? (
            <div className="my-[10px] flex flex-col gap-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="pl-4 p-2 border border-[#EDEFF1] rounded-[5px] w-full"
                  name="title"
                  value={post.title}
                  onChange={changePost}
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Text"
                  name="description"
                  cols={30}
                  rows={10}
                  className="pl-4 p-2 border border-[#EDEFF1] rounded-[5px] w-full"
                  value={post.description}
                  onChange={changePost}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="my-[10px] flex flex-col gap-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="pl-4 p-2 border border-[#EDEFF1] rounded-[5px] w-full"
                  name="title"
                  value={post.title}
                  onChange={changePost}
                  required
                />
              </div>
              <div
                className={`flex ${filename.length === 0 ? 'justify-center border-dashed items-center' : 'justify-center bg-black opacity-100'} border border-gray-500 h-[300px]`}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={imageSelect}
                  name="image"
                  onChange={changeImageFiled}
                  required
                />
                {filename.length === 0 ? (
                  <button
                    className="capitalize border-blue-700 border text-blue-600 font-bold p-[5px] px-[10px] rounded-[35px]"
                    onClick={selectImage}
                    type="button"
                  >
                    browse
                  </button>
                ) : (
                  <div className="flex relative">
                    <img
                      className="w-full object-contain"
                      src={imageData}
                      alt="preview"
                    />
                    <button
                      onClick={clearImageField}
                      type="button"
                      className="absolute bg-[#ff6314] text-white px-[10px] py-[2px] text-center right-[15px] top-[10px] rounded-[50%]"
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex gap-x-3 justify-end border-t pt-[20px] border-white">
            <button
              type="button"
              onClick={() => navigate(routes.home)}
              className="bg-white border text-blue-600 font-bold border-blue-700 p-[5px] px-[10px] capitalize rounded-[30px]"
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={
                post.title === '' &&
                post.image === null &&
                post.description === ''
              }
              className={` p-[5px] px-[10px] ${
                post.title === '' &&
                post.image === null &&
                post.description === ''
                  ? 'blockButton'
                  : 'hover:bg-[#003584] bg-[#0045AC]'
              } capitalize text-white rounded-[30px]`}
            >
              post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostPage;
