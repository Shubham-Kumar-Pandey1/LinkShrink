import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <a className="btn btn-ghost text-xl">
        <img src="/logo.png" alt="Logo" className="h-14 w-14 rounded-full" />
      </a>
      <div className="flex flex-col">
        <p className="text-lg font-bold tracking-wide">URL Shortener</p>
        <p className="text-sm font-semibold text-gray-400 tracking-wider">
          LINK → SHRINK
        </p>
      </div>
    </div>
  );
}

export default Logo;
