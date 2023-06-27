import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './components/homepage';
import Login from './components/login/Login';
import Signup from './components/signup/signup';
import Panel from './components/user/panel';
import Borrow from './components/user/borrow';
import Header from './components/user/header';
import Return from './components/user/return';
import Loans from './components/user/loans';
import Members from './components/admin/members';
import './user.css';
import SingleBook from './components/user/SingleBook';


import Books from './components/admin/books';
import LoanedBooks from './components/admin/loans';
import SideBar from './components/admin/sideBar';
import Addbook from './components/admin/addbook';
import Deletebook from './components/admin/deletebook';

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
     path: '/',
      title: 'HOME',
      element:<SideBar/>,
      children:[
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
    },
    {
      path: '/books',
     title:'BOOKS',
     element:<Books/>,
      cName:'nav-text'
    },
    {
      path: '/users',
      title:'USERS',
      element:<Members/>,
      cName:'nav-text'
     
    },
    {
      path: '/loanedbooks',
      title:'LOANS',
      element:<LoanedBooks/>,
    
      cName:'nav-text'
    },
    { 
      path: '/addbook',
      title:'Addbook',
      element:<Addbook/>,
     cName:'nav-text'
    },
    { 
      path: '/deletebook',
      title:'Addbook',
      element:<Deletebook/>,
     cName:'nav-text'
    } 
  ]},
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

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

