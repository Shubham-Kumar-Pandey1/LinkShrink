import React from "react";
import { FaRocket, FaMoneyBillWave, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa"; 
import Mobiledropdown from "./Home/MyNavbarComponent/Mobiledropdown.jsx";
import Logo from "./Home/MyNavbarComponent/Logo.jsx";
import NavMidButton from "./Home/MyNavbarComponent/NavMidButton.jsx";
import NavEndButton from "./Home/MyNavbarComponent/NavEndButton.jsx";
function Navbar() {
  return (
    <div className="navbar bg-black text-white shadow-md h-20 px-6 flex justify-between">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-6">
        {/* Mobile Dropdown */}
        <Mobiledropdown />
        {/* Logo Section */}
        <Logo />
      </div>
      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 gap-6">
        <li><NavMidButton label="Features" icon={FaRocket} path="/features" /></li>
        <li><NavMidButton label="Pricing" icon={FaMoneyBillWave} path="/pricing" /></li>
        <li><NavMidButton label="Contact" icon={FaEnvelope} path="/contact" /></li>
      </ul>
    </div>
      {/* Navbar End */}
      <div className="navbar-end flex gap-4">
        <NavEndButton label="Login" icon={FaSignInAlt} path="/login"/>
        <NavEndButton label="Sign Up" icon={FaUserPlus} path="/signup"/>
    </div>
  </div>
  );
}

export default Navbar;
