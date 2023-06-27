import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './components/homepage';
import Panel from './components/user/panel';
import Borrow from './components/user/borrow';
import Header from './components/user/header';
import Return from './components/user/return';
import Loans from './components/user/loans';
import Login from './components/login/Login';
import Signup from './components/signup/signup';
import './user.css';
import SingleBook from './components/user/SingleBook';

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: '/user',
      element: <Panel />, 
      children: [
        {
          path: '/user',
          element: <Header />
        },
        {
          path: '/user/borrow',
          element: <Borrow />
        },
        {
          path: '/user/return',
          element: <Return />
        },
        {
          path: '/user/loans',
          element: <Loans />
        },
        {
          path: '/user/return',
          element: <Return />
        }
      ]
    },
    {
      path: '/books/:id',
      element: <SingleBook />
    }
  ]);

  return (
    
    <RouterProvider router={router} />
  
   
   );
}

export default App;

