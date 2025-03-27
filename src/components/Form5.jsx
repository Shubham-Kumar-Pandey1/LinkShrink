import React, { useState, useEffect } from "react";

const Form5 = () => {
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
      alert("😤 Bhai, bina signup ke link chhoti karna chahte ho? Pehle signup kar lo! 😂");
      window.location.href = "/signup";
      return;
    }

    console.log("URL Submitted:", url);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-10">
      <h2 className="text-xl font-bold text-gray-900 text-center leading-snug">
        "🛑 Ram Ram! 🏋️‍♂️ Laddar k kahe tha, badi badi link bhejega? 🤨" <br />
        <span className="text-blue-600">Software hum bhi rakhte hai pehlwaan, jab tera ji kare, chhoti karwa liye! 😎🔥</span>
      </h2>
      
      <p className="text-gray-600 mt-3 text-center text-lg">
        🕶️ NAAM mera Billu Maxi, badi badi link p blade khechu, saxcy! 😏🔪
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="mt-6 w-full max-w-md bg-white p-6 shadow-2xl rounded-lg border border-gray-300"
      >
        <label className="block text-xl font-semibold text-gray-700 mb-2">
          🔗 Badi link daal ke dikha de, pehlwaan!
        </label>
        <input
          type="text"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-gray-800 text-lg"
          placeholder="Link de idhar bhai 🔗"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md text-xl flex items-center justify-center gap-2"
        >
          🚀 Hightech software activate  💥
        </button>
      </form>
    </div>
  );
};

export default Form5;
