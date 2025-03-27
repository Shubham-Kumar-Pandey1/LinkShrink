import React, { useState, useEffect } from "react";

const Form4 = () => {
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
      alert("Bhai, bina signup ke link chhoti karna chahte ho? Pehle signup kar lo! 🤨😂");
      window.location.href = "/signup";
      return;
    }

    console.log("URL Submitted:", url);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-10">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        "Dekh lun kya, konsi link bhej raha hai? 😏" <br />
        Khabar aayi hai, tu kuch noty noty links bhejta hai! 👀
      </h2>
      <p className="text-gray-600 mt-2 text-center">
        😤 Kru teri guddi laal karega aage se ? 
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="mt-6 w-full max-w-md bg-white p-6 shadow-xl rounded-lg"
      >
        <label className="block text-lg font-medium text-gray-700 mb-2">
          🧐 Sudhar ja, koi tameez wali link bhej!  
        </label>
        <input
          type="text"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Link de idhar bhai 🔗"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          🔥 Link Choti kru abhi teri!  
        </button>
      </form>
    </div>
  );
};

export default Form4;
