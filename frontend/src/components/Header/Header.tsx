import { Link } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../store/users/usersSlice.ts';
import { useState } from 'react';
import { logout } from '../../store/users/usersThunk.ts';

const Header = () => {
  const user = useAppSelector(selectUser);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setShowMenu(false);
  };

  return (
    <div className="px-[30px] relative">
      <div className="flex justify-between items-center border-b border-gray-400 py-3">
        <div>
          <Link to={routes.home}>
            <h2 className="text-[#ff6314] text-4xl font-bold">MReddit</h2>
          </Link>
        </div>
        {user ? (
          <div className="flex gap-x-3 items-center">
            <Link
              className="p-[5px] px-[10px] capitalize rounded-[30px] hover:bg-gray-400"
              to={routes.newPost}
            >
              Create
            </Link>
            <div>
              <p
                className="cursorNormal"
                onClick={() => setShowMenu(!showMenu)}
              >
                Hello,{' '}
                <span className="capitalize font-bold">{user.username}</span>
              </p>
              {showMenu ? (
                <div
                  className={`z-10 ${showMenu ? 'bloc' : 'hidden'} absolute right-5 top-[60px] bg-[#DAE0E6] rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex gap-x-3">
            <Link
              className="bg-[#ff6314] text-white text-sm rounded-full py-2 px-3 hidden md:inline-flex"
              to={routes.signUp}
            >
              Sign up
            </Link>
            <Link
              className="bg-[#ff6314] text-white text-sm rounded-full py-2 px-3 hidden md:inline-flex"
              to={routes.signIn}
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
