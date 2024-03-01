import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { register } from '../../store/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import { selectRegisterError } from '../../store/users/usersSlice.ts';

const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate(routes.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-gray-200 p-[20px] box-border w-[45%] rounded-[8px]">
        <h2 className="text-center text-5xl font-bold mb-[30px]">Sign Up</h2>
        <form onSubmit={sendFormHandler} className="flex flex-col gap-y-3">
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            name="username"
            value={state.username}
            onChange={changeField}
            type="text"
            required
          />
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            name="password"
            value={state.password}
            onChange={changeField}
            type="password"
            required
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <button
            className="bg-[#ff6314] rounded-[30px] text-base font-bold py-[8px] text-white capitalize"
            type="submit"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
