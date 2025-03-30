import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth.js";
import Cookies from "js-cookie"; // Import js-cookie

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); // Stores backend response message
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
  
    try {
      await signup(formData.username, formData.useremail, formData.userpassword);
      const token = localStorage.getItem("jwt"); 
  
      if (token) {
        navigate("/dashboard"); 
      } else {
        navigate("/login"); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "⚠️ User already exists! Please try logging in.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-[800px] h-[500px] shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold text-center">WELCOME TO LINKSHRINK!</h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            LinkShrink – Shorten, secure, and track your links effortlessly! 🚀
          </p>
        </div>

        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sign Up</h3>

          {/* 🔥 Display error message from backend */}
          {error && (
            <div className="w-full mb-4 text-sm text-red-700 bg-red-100 p-2 rounded border border-red-500">
              {error}
            </div>
          )}

          <form className="w-full max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800" />
            </div>

            <div>
              <label htmlFor="useremail" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="useremail" name="useremail" value={formData.useremail} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800" />
            </div>

            <div>
              <label htmlFor="userpassword" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="userpassword" name="userpassword" value={formData.userpassword} onChange={handleChange} required className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800" />
            </div>

            <button type="submit" className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
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
