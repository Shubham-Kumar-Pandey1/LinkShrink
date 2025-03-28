import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth"; // Import signup API

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(formData.username, formData.useremail, formData.userpassword);
      alert("Signup successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-[800px] h-[450px] shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold text-center">WELCOME TO LINKSHRINK!</h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            LinkShrink – Shorten, secure, and track your links effortlessly! 🚀
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sign Up</h3>

          <form className="w-full max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="useremail" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="useremail"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="userpassword" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="userpassword"
                name="userpassword"
                value={formData.userpassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Sign Up
            </button>
          </form>

          <p className="text-sm mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
