import { Route, Routes } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import HomePage from '../HomePage/HomePage.tsx';
import NotPage from '../NotPage/NotPage.tsx';
import Layout from '../../components/Layout/Layout.tsx';
import PostPage from '../PostPage/PostPage.tsx';
import RegisterPage from '../RegisterPage/RegisterPage.tsx';
import LoginPage from '../LoginPage/LoginPage.tsx';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.post + '/:id'} element={<PostPage />} />
          <Route path={routes.signUp} element={<RegisterPage />} />
          <Route path={routes.signIn} element={<LoginPage />} />
          <Route path={routes.notPage} element={<NotPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
