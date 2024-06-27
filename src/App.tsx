import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import LabelPage from '@/pages/LabelPage';
import LoginCallbackPage from '@/pages/LoginCallbackPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/label',
      element: <LabelPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/callback',
      element: <LoginCallbackPage />,
      errorElement: <ErrorPage />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
