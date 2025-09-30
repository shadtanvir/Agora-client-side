import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import PostDetails from "../Pages/PostDetails";
import AuthLayout from "../Layouts/AuthLayout";
import JoinUs from "../Pages/JoinUS";

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
        element: <PostDetails></PostDetails>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <JoinUs></JoinUs>,
      },
    ],
  },
]);

export default mainRoutes;
