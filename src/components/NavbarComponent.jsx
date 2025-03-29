import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiLink, FiBarChart2, FiLogOut, FiUser } from "react-icons/fi";
import { logout } from "../api/auth.js"; 
import { jwtDecode } from "jwt-decode";


const NavbarComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT
        setUsername(decoded.username || "User"); // Set username
      } catch (error) {
        console.error("Invalid token", error);
        setUsername("User");
      }
    }
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      localStorage.removeItem("jwt"); // Clear JWT
      // Force navigation after logout
      navigate("/"); 
    }
  };

  return (
    <div className="navbar bg-black text-white px-8 py-4 flex items-center">
      {/* Left Side - Logo */}
      <div className="flex-1">
        <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2">
          🔗 LinkShrink
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="flex gap-x-10">
        <Link to="/dashboard" className="hover:text-blue-400 transition flex items-center gap-2">
          <FiHome size={20} />
          Home
        </Link>
        <Link to="/links" className="hover:text-blue-400 transition flex items-center gap-2">
          <FiLink size={20} />
          Links
        </Link>
        <Link to="/analytics" className="hover:text-blue-400 transition flex items-center gap-2 ml-4">
          <FiBarChart2 size={20} />
          Analytics
        </Link>
      </div>

      {/* Right Side - User Dropdown */}
      <div className="dropdown dropdown-end ml-6">
        <label tabIndex={0} className="btn btn-ghost flex items-center gap-3">
          <FiUser size={20} />
          <span className="text-white">{username}</span>
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white text-black rounded-box w-44">
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-500 hover:text-white p-2 rounded-md"
            >
              <FiLogOut size={16} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarComponent;
