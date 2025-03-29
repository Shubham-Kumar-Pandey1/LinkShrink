import React from "react";
import { FaRocket, FaMoneyBillWave, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa";

function Mobiledropdown() {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
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
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>

      {/* Mobile Menu */}
      <ul className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-box z-10 mt-3 w-52 p-2 shadow">
        <li>
          <a className="flex items-center gap-2">
            <FaRocket /> Features
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2">
            <FaMoneyBillWave /> Pricing
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2">
            <FaEnvelope /> Contact
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2">
            <FaSignInAlt /> Login
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2">
            <FaUserPlus /> Sign Up
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Mobiledropdown;
