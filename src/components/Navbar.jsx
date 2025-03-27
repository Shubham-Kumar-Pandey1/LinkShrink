import React from "react";
import { FaRocket, FaMoneyBillWave, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-black text-white shadow-md h-20 px-6 flex justify-between">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-6">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          {/* Mobile Menu */}
          <ul className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><a className="flex items-center gap-2"><FaRocket /> Features</a></li>
            <li><a className="flex items-center gap-2"><FaMoneyBillWave /> Pricing</a></li>
            <li><a className="flex items-center gap-2"><FaEnvelope /> Contact</a></li>
            <li><a className="flex items-center gap-2"><FaSignInAlt /> Login</a></li>
            <li><a className="flex items-center gap-2"><FaUserPlus /> Sign Up</a></li>
          </ul>
        </div>

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <a className="btn btn-ghost text-xl">
            <img src="/logo.png" alt="Logo" className="h-14 w-14 rounded-full" /> 
          </a>
          <div className="flex flex-col">
            <p className="text-lg font-bold tracking-wide">URL Shortener</p>
            <p className="text-sm font-semibold text-gray-400 tracking-wider">LINK → SHRINK</p>
          </div>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 gap-6">
        <li>
          <button
            className="flex items-center gap-2 text-white bg-transparent border-none cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/features")}
          >
            <FaRocket /> Features
          </button>
        </li>
        <li>
          <button
            className="flex items-center gap-2 text-white bg-transparent border-none cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/pricing")}
          >
            <FaMoneyBillWave /> Pricing
          </button>
        </li>
        <li>
          <button
            className="flex items-center gap-2 text-white bg-transparent border-none cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/contact")}
          >
            <FaEnvelope /> Contact
          </button>
        </li>
      </ul>
    </div>

      {/* Navbar End */}
      <div className="navbar-end flex gap-4">
      <button 
        className="btn bg-white text-black hover:bg-gray-300 flex items-center gap-2"
        onClick={() => navigate("/login")}
      >
        <FaSignInAlt /> Login
      </button>
      <button 
        className="btn bg-white text-black hover:bg-gray-300 flex items-center gap-2"
        onClick={() => navigate("/signup")}
      >
        <FaUserPlus /> Sign Up
      </button>
    </div>
  </div>
  );
}

export default Navbar;
