import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hasJwt = document.cookie.split("; ").some((c) => c.startsWith("jwt="));
    if (hasJwt) {
      navigate("/dashboard"); // Redirect if JWT exists
    }
  }, [navigate]);

  const handleRedirect = () => {
    const hasJwt = document.cookie.split("; ").some((c) => c.startsWith("jwt="));

    if (!hasJwt) {
      alert("⚠️ You need to sign up before shortening a URL! ✨ Please sign up to continue. 🚀");
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-10">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center leading-snug">
        Shorten Your URL Instantly <br />
        <span className="text-gray-400">Fast & Secure Link Shortener</span>
      </h2>

      <p className="text-gray-400 mt-3 text-center text-lg">
        Paste your long URL below and get a short one in seconds!
      </p>

      <form className="mt-6 w-full max-w-lg p-8 bg-gray-900 shadow-2xl rounded-xl border border-gray-700">
        <label className="block text-lg font-semibold text-white mb-2">
          Enter your URL:
        </label>

        <div className="relative">
          <input
            type="text"
            value={url}
            required
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 pr-12 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-500 text-lg shadow-sm"
            placeholder="Paste your link here 🔗"
          />
          <span className="absolute right-4 top-4 text-gray-400">🔗</span>
        </div>

        <button
          onClick={handleRedirect}
          type="button"
          disabled={!url.trim()}
          className={`mt-5 w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md text-xl flex items-center justify-center gap-2
            ${!url.trim()
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-300 hover:text-black hover:scale-105"}`}
        >
          🚀 Shorten Link
        </button>
      </form>
    </div>
  );
}

export default Form;
