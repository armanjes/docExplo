import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (data.ok) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      setUser(null);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-stone-100">
      <div className="py-4 flex justify-between items-center mx-auto w-[90%] md:w-[80%]">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-semibold text-gray-800">
          Doc<span className="text-indigo-500">Explo</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center items-center gap-8 text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-medium"
                  : "hover:text-indigo-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-medium"
                  : "hover:text-indigo-500"
              }
            >
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-medium"
                  : "hover:text-indigo-500"
              }
            >
              About
            </NavLink>
          </li>
          {user?.role === "Admin" && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "hover:text-indigo-500"
                }
              >
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right section (Profile or Login) */}
        <div className="flex items-center gap-3">
          {!user && (
            <div>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block md:hidden font-medium text-white bg-indigo-500 px-4 py-1 rounded hover:bg-indigo-600"
              >
                Login
              </NavLink>
            </div>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <img
                  src={
                    user.image ||
                    "https://static.thenounproject.com/png/4154905-200.png"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hidden md:block font-medium text-white bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600"
            >
              Login
            </NavLink>
          )}

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-100 border-t border-stone-200">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-700">
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" onClick={() => setMenuOpen(false)}>
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
