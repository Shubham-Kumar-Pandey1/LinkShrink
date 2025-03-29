import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";
import Cookies from "js-cookie"; // Import js-cookie

function Login() {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt"); // Check if user is already logged in
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
  
    try {
      const response = await login(useremail, userpassword); // Call login API
      console.log("Login successful:", response);
  
      const token = Cookies.get("jwt"); // Get JWT from cookies
      if (token) {
        localStorage.setItem("jwt", token); // Store JWT in local storage
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative flex w-[800px] h-[450px] shadow-lg rounded-lg overflow-hidden border border-transparent before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-white/50 before:blur-xl before:pointer-events-none">
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Login</h3>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form className="w-full max-w-xs" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="useremail" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="useremail" 
                value={useremail} 
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="userpassword" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="userpassword" 
                value={userpassword} 
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm mt-3">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-medium">Sign Up</Link>
          </p>
        </div>

        <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl font-bold">WELCOME BACK!</h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            Access your links anytime, anywhere – Secure, Fast, and Smart! 🔗✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
