import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Forms from './components/pages/forms';
import Questions from './components/pages/questions';
import Options from './components/pages/options';

const routes = createBrowserRouter([
  {
    path: "/*",
    element: <App>404 Not Found</App>,
  },
  {
    path: "/test",
    element: <>Test</>,
  },
  {
    path: "/forms",
    element: <App><Forms /></App>,
  },
  {
    path: "/questions",
    element: <App><Questions /></App>,
  },
  {
    path: "/options",
    element: <App><Options /></App>,
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />
}

export default Router