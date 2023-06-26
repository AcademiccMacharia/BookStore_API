
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

