import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/signup/signup';

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
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
