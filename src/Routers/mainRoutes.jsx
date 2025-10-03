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
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement";
import ReportedComments from "../Pages/Dashboard/ReportedComments";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import MembershipPage from "../Pages/MembershipPage";
import ErrorPage from "../Pages/ErrorPage";
import ManageCourses from "../Pages/ManageCourses";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <MembershipPage></MembershipPage>
          </PrivateRoute>
        ),
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
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <DashboardIndex></DashboardIndex>,
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

      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/reported-comments",
        element: <ReportedComments></ReportedComments>,
      },

      {
        path: "/dashboard/make-announcement",
        element: <MakeAnnouncement></MakeAnnouncement>,
      },
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
    ],
  },
]);

export default mainRoutes;
