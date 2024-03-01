import { Route, Routes } from 'react-router-dom';
import { routes } from '../../constants/route.ts';
import HomePage from '../HomePage/HomePage.tsx';
import NotPage from '../NotPage/NotPage.tsx';
import Layout from '../../components/Layout/Layout.tsx';
import PostPage from '../PostPage/PostPage.tsx';
import RegisterPage from '../RegisterPage/RegisterPage.tsx';
import LoginPage from '../LoginPage/LoginPage.tsx';
import NewPostPage from '../NewPostPage/NewPostPage.tsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Layout>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.post + '/:id'} element={<PostPage />} />
          <Route path={routes.signUp} element={<RegisterPage />} />
          <Route path={routes.signIn} element={<LoginPage />} />
          <Route path={routes.newPost} element={<NewPostPage />} />
          <Route path={routes.notPage} element={<NotPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
