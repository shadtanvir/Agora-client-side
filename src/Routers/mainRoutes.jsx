import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import PostDetails from "../Pages/PostDetails";
import AuthLayout from "../Layouts/AuthLayout";
import JoinUs from "../Pages/JoinUS";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/Myprofile";
import AddPost from "../Pages/Dashboard/AddPost";
import MyPosts from "../Pages/Dashboard/MyPosts";
import Comments from "../Pages/Dashboard/Comments";
import DashboardIndex from "../components/DashboardIndex";

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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndex></DashboardIndex>,
      },
      {
        path: "/dashboard/admin-profile",
        element: <h2>Admin profile</h2>,
      },
      {
        path: "/dashboard/user-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/comments/:postId",
        element: <Comments></Comments>,
      },
      {
        path: "/dashboard/my-posts",
        element: <MyPosts></MyPosts>,
      },
      {
        path: "/dashboard/add-post",
        element: <AddPost></AddPost>,
      },
    ],
  },
]);

export default mainRoutes;
