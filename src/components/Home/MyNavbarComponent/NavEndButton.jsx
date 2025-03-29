import React from "react";
import { useNavigate } from "react-router-dom";

function NavEndButton({ label, icon: Icon, path }) {
  const navigate = useNavigate();

  return (
    <button
      className="btn bg-white text-black hover:bg-gray-300 flex items-center gap-2"
      onClick={() => navigate(path)}
    >
      <Icon /> {label}
    </button>
  );
}

export default NavEndButton;
