import { routes } from '../../constants/route.ts';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-gray-200 p-[20px] box-border w-[45%] rounded-[8px]">
        <h2 className="text-center text-5xl font-bold mb-[30px]">Log in</h2>
        <form className="flex flex-col gap-y-3">
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            name="username"
            // value={state.username}
            // onChange={changeField}
            type="text"
            required
          />
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            name="password"
            // value={state.password}
            // onChange={changeField}
            type="password"
            required
          />
          {/*{error && <p className="text-red-500 text-sm">{error.message}</p>}*/}
          <button
            className="bg-[#ff6314] rounded-[30px] text-base font-bold py-[8px] text-white capitalize"
            type="submit"
          >
            Log in
          </button>
        </form>
        <p className="text-center border-t mt-[30px] py-[30px] border-gray-500">
          No account?{' '}
          <Link className="hover:text-[#ff6314]" to={routes.signUp}>
            Sign up for MReddit
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
