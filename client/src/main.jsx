import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ErrorPage from './pages/404';
import ProductsPage from './pages/products';
import ProfilePage from './pages/profile';
import DetailProductPage from './pages/detailProduct';
import { Provider } from 'react-redux';
import store from './store/index';
import Navbar from './components/Layouts/Navbar';
import DarkModeContextProvider from './context/DarkMode';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/products",
    element: <ProductsPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/products/:id",
    element: <DetailProductPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <RouterProvider router={router} />
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>,
)
