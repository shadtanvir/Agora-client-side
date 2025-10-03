import React, { useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo.png";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
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
        to="/dashboard/user-profile"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "rounded-none font-bold text-primary"
            : "hover:font-bold text-primary"
        }
      >
        My Profile
      </NavLink>
      <NavLink
        to="/dashboard/add-post"
        onClick={() => setIsOpen(false)} 
        className={({ isActive }) =>
          isActive
            ? "rounded-none font-bold text-primary"
            : "hover:font-bold text-primary"
        }
      >
        Add Post
      </NavLink>
      <NavLink
        to="/dashboard/my-posts"
        onClick={() => setIsOpen(false)} 
        className={({ isActive }) =>
          isActive
            ? "rounded-none font-bold text-primary"
            : "hover:font-bold text-primary"
        }
      >
        My Posts
      </NavLink>
    </>
  );

  return (
    <div className="flex min-h-screen font-inter">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-base-300 shadow-lg p-5">
        <Link to="/" className="flex items-center gap-1 mb-5">
          <img src={logo} alt="Logo" className="w-17 h-17 object-contain" />
          <span className="text-blue-600 text-3xl -ml-4 font-bold">Agora</span>
        </Link>
        <h2 className="text-xl text-primary font-bold mb-6">
          {user?.displayName}'s Dashboard
        </h2>
        <nav className="flex text-lg flex-col gap-3">{navLinks}</nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-base-300 shadow-lg flex items-center gap-1 p-4">
        {/* Hamburger */}
        <button
          className="btn btn-ghost text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger / X toggle */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // 3 lines
              }
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
          <span className="text-blue-600 text-2xl font-bold">Agora</span>
        </Link>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar itself */}
          <div className="w-64 h-screen bg-base-300 shadow-lg flex flex-col p-3 animate-slide-in">
            

            <Link
              to="/"
              className="flex items-center gap-2 mb-6"
              onClick={() => setIsOpen(false)} // Close on click
            >
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              <span className="text-blue-600 text-2xl font-bold">Agora</span>
            </Link>

            <h2 className="text-xl text-primary font-bold mb-6">
              {user?.displayName}'s Dashboard
            </h2>

            <nav className="flex flex-col gap-4 text-lg">
              {/* Map through navLinks and close on click */}
              {React.Children.map(navLinks, (link) =>
                React.cloneElement(link, {
                  onClick: () => setIsOpen(false), // close drawer
                })
              )}
            </nav>
          </div>

          {/* Clickable overlay to close */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Content Area (pushes down on mobile because navbar is fixed) */}
      <main className="flex-1 bg-base-100 p-6 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
