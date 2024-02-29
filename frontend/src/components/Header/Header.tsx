import { Link } from 'react-router-dom';
import { routes } from '../../constants/route.ts';

const Header = () => {
  return (
    <div className="px-[30px]">
      <div className="flex justify-between items-center border-b border-black py-3">
        <div>
          <Link to={routes.home}>
            <h2 className="text-[#ff6314] text-4xl font-bold">MReddit</h2>
          </Link>
        </div>
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
      </div>
    </div>
  );
};

export default Header;
