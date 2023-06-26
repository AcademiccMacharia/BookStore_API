import React from 'react';
import './user.css';
import Panel from './components/user/panel';
import Borrow from './components/user/borrow';
import Header from './components/user/header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Return from './components/user/return';
import Loans from './components/user/loans';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Panel />, 
    children: [
      {
        path: '/',
        element: <Header />
      },
      {
        path: '/borrow',
        element: <Borrow />
      },
      {
        path: '/return',
        element: <Return />
      },
      {
        path: '/loans',
        element: <Loans />
      }
    ]
  }
]);




function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    }
  ]);

  return (
 <RouterProvider router={router} />
  );
}

export default App;

