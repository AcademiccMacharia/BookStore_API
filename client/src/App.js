
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

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
  return (
    
    <RouterProvider router={router} />
  
   
   );
}

export default App;
