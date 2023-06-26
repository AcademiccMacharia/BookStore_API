
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Members from './components/admin/members';


import Books from './components/admin/books';
import Loans from './components/admin/loans';
import SideBar from './components/admin/sideBar';


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
            path: '/settings',
            title:'SETTINGS',
            element:<Members/>,
           cName:'nav-text'
          } 
        ]}
             
]
 );



function App() {
  return (
    
    <RouterProvider router={router} />
  
   
   );
}

export default App;
