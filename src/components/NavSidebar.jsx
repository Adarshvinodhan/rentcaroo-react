import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

const NavSidebar = () => {
  const { user, loading } = useAuth(); // Get user and loading from context
  const navigate = useNavigate();
  const location = useLocation(); // To handle active links
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Sidebar
  const toggleMenu = () => setIsOpen(!isOpen);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  // Sidebar Link Styling
  const linkClass = (path) =>
    `relative text-gray-700 hover:text-blue-500 transition duration-200 ${
      location.pathname === path ? "text-blue-500 font-semibold" : ""
    } before:content-[''] before:absolute before:-bottom-1.5 before:left-0 before:w-full before:h-[2px] 
    before:bg-blue-500 before:scale-x-0 before:origin-left hover:before:scale-x-100 
    before:transition-transform before:duration-300`;

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-[100vw] sm:left-64 sm:w-[calc(100%-16rem)] bg-white shadow-md px-4 py-2 h-16 z-50">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-gray-700 sm:hidden p-2 z-40"
          >
            {isOpen ? (
              <FiX size={24} className="text-black" />
            ) : (
              <FiMenu size={24} className="text-black" />
            )}
          </button>

          {/* Logo */}
          <div className="flex-1 text-center text-2xl font-bold text-black sm:text-left">
            <Link to="/home" className="hover:text-gray-700 transition duration-200">
              Rent<span className="text-blue-600 italic">Caroo</span>
            </Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="text-black hover:text-gray-700 transition duration-200 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-md p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-xl font-semibold mt-14 sm:mt-0 mb-4">
          Welcome, {user?.username}
        </h2>
        <nav>
          <ul className="space-y-4">
            {user?.role === "user" && (
              <>
                <li>
                  <Link
                    to="/home"
                    className={linkClass("/")}
                    onClick={() => setIsOpen(false)}
                  >
                    Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className={linkClass("/profile")}
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/booking"
                    className={linkClass("/booking")}
                    onClick={() => setIsOpen(false)}
                  >
                    Bookings
                  </Link>
                </li>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/admin/users"
                    className={linkClass("/admin/users")}
                    onClick={() => setIsOpen(false)}
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/addcar"
                    className={linkClass("/admin/addcar")}
                    onClick={() => setIsOpen(false)}
                  >
                    Add Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/bookings"
                    className={linkClass("/admin/bookings")}
                    onClick={() => setIsOpen(false)}
                  >
                    Bookings
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Overlay for Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default NavSidebar;
