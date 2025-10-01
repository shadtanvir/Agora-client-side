import React, { use } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo.png";

const UserDashboard = () => {
  const { user } = use(AuthContext);
  return (
    <div className="flex min-h-screen font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-base-300 shadow-lg p-5">
        <Link to="/" className="flex items-center gap-1 mb-5 ">
          <img src={logo} alt="Logo" className="w-17 h-17 object-contain" />
          <span className="text-blue-600 text-3xl -ml-4 font-bold ">Agora</span>
        </Link>
        <h2 className="text-xl text-primary font-bold mb-6">
          {user.displayName}'s Dashboard
        </h2>
        <nav className="flex text-lg flex-col gap-3">
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
            to="/dashboard/user-profile"
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

export default UserDashboard;
