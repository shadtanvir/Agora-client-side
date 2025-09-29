import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout> ,
  },
]);

export default mainRoutes;
