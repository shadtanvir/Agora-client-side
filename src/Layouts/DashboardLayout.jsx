import React, { use } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { user } = use(AuthContext);
  return (
    <div className="flex min-h-screen font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-base-300 shadow-lg p-5">
        <h2 className="text-3xl text-primary font-bold mb-6">
          {user.displayName}'s Dashboard
        </h2>
        <nav className="flex text-xl flex-col gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold  text-primary"
                : " hover:font-bold  text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold  text-primary"
                : " hover:font-bold  text-primary"
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/dashboard/add-post"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold  text-primary"
            }
          >
            Add Post
          </NavLink>
          <NavLink
            to="/dashboard/my-posts"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold  text-primary"
            }
          >
            My Posts
          </NavLink>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-base-100 p-6">
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </div>
  );
};

export default DashboardLayout;
