import React, { useState, useEffect } from "react";

function Form() {
  const [url, setUrl] = useState("");

  // Check JWT cookie on page load
  useEffect(() => {
    const hasJwt = document.cookie.split("; ").some((c) => c.startsWith("jwt="));
    if (hasJwt) {
      window.location.href = "/dashboard"; // Redirect if JWT exists
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Check if 'jwt' cookie exists
    const hasJwt = document.cookie.split("; ").some((c) => c.startsWith("jwt="));

    if (!hasJwt) {
      alert("⚠️ You need to sign up before shortening a URL! ✨ Please sign up to continue. 🚀");
      window.location.href = "/signup";
      return;
    }

    // Logic for URL shortening goes here
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-10">
      <h2 className="text-xl font-bold text-gray-900 text-center leading-snug">
        Shorten Your URL Instantly <br />
        <span className="text-blue-600">Fast & Secure Link Shortener</span>
      </h2>

      <p className="text-gray-600 mt-3 text-center text-lg">
        Paste your long URL below and get a short one in seconds!
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="mt-6 w-full max-w-md bg-white p-6 shadow-2xl rounded-lg border border-gray-300"
      >
        <label className="block text-xl font-semibold text-gray-700 mb-2">
          Enter your URL:
        </label>
        <input
          type="text"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-800 text-lg"
          placeholder="Type/Paste your URL here 🔗"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md text-xl flex items-center justify-center gap-2"
        >
          Shorten Link 🚀
        </button>
      </form>
    </div>
  );
}

export default Form;
