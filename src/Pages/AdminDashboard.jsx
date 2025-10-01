import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo.png";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-base-300 shadow-lg p-5">
      
          <Link to="/" className="flex items-center gap-1 mb-5 ">
            <img src={logo} alt="Logo" className="w-17 h-17 object-contain" />
            <span className="text-blue-600 text-3xl -ml-4 font-bold ">Agora</span>
          </Link>
        
        <h2 className="text-3xl text-primary font-bold mb-6">
          Admin Dashboard
        </h2>
      
        <nav className="flex text-xl flex-col gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold text-primary"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/admin-profile"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold text-primary"
            }
          >
            Admin Profile
          </NavLink>

          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold text-primary"
            }
          >
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/reported-comments"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold text-primary"
            }
          >
            Reported Comments
          </NavLink>

          <NavLink
            to="/dashboard/make-announcement"
            className={({ isActive }) =>
              isActive
                ? "rounded-none font-bold text-primary"
                : "hover:font-bold text-primary"
            }
          >
            Make Announcement
          </NavLink>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-base-100 p-6">
        <Outlet /> {/* ✅ Nested routes for admin pages */}
      </main>
    </div>
  );
};

export default AdminDashboard;
