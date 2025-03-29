import React from "react";
import { useNavigate } from "react-router-dom";

function NavMidButton({ label, icon: Icon, path }) {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center gap-2 text-white bg-transparent border-none cursor-pointer hover:text-gray-300"
      onClick={() => navigate(path)}
    >
      <Icon /> {label}
    </button>
  );
}

export default NavMidButton;
