import React from "react";

const Information = () => {
  return (
    <div className="flex flex-col justify-center h-full px-10">
      <h1 className="text-4xl font-bold text-white">
        Welcome to the URL Shortener
      </h1>
      <p className="text-lg text-gray-400 mt-2">Shrink your link with us!</p>
      
      <div className="mt-6 p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white">
          "Simplify Your Links, Amplify Your Reach"
        </h2>
        <p className="text-gray-400 mt-2 leading-relaxed">
          Shorten long URLs effortlessly with our secure and customizable URL shortener. 
          Generate self-destructing links, password-protected URLs, and track analytics—all in one powerful platform. 
          Enhance your digital connections with ease! 🚀
        </p>
      </div>
    </div>
  );
};

export default Information;
