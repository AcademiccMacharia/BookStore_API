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



import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Members from './components/admin/members';


import Books from './components/admin/books';
import Loans from './components/admin/loans';
import SideBar from './components/admin/sideBar';
import Addbook from './components/admin/addbook';
import Deletebook from './components/admin/deletebook';


const router = createBrowserRouter(
  [
    {
       
            path: '/',
            title: 'HOME',
            element:<SideBar/>,
            children:[
    
          
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
            path: '/loans',
            title:'LOANS',
            element:<Loans/>,
          
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
        ]}
             
]
 );



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
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;

