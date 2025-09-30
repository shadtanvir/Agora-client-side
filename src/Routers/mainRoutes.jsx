import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import PostDetails from "../Pages/PostDetails";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/posts/:id",
        element: <PostDetails></PostDetails> ,
      },
    ],
  },
]);

export default mainRoutes;
