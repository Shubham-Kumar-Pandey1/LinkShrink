import React, { useState, useEffect } from "react";

const Form1 = () => {
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
      alert("🚨 Bhai, bina signup ke short link? Privacy maintain nahi karni kya? Pehle signup kar! 🔒😂");
      window.location.href = "/signup";
      return;
    }

    console.log("URL Submitted:", url);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-10">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        "Koi ho, kahin se ho, kitni bhi badi link ho... koi farq nahi padta. Ek hi link hai, chhoti hoti hi, game khatam! 🔥😎"
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        "Link chhoti karne ka asli mazza tabhi aata hai jab samne wale ki bhi link tagdi ho! 😉🔗"
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="mt-6 w-full max-w-md bg-white p-6 shadow-xl rounded-lg"
      >
        <label className="block text-lg font-medium text-gray-700 mb-2">
          🔥 "Location bhej link ki" 🔫👇
        </label>
        <input
          type="text"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          🔥 "Link todta hu abhi teri!" 😎💥
        </button>
      </form>
    </div>
  );
};

export default Form1;
