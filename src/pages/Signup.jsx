import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Main Container */}
      <div className="flex w-[800px] h-[450px] shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Side - Welcome Text */}
        <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold text-center leading-tight">
            WELCOME BACK TO LINKSHRINK!
          </h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            Access your links anytime, anywhere – Secure, Fast, and Smart! 🔗✨
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sign Up</h3>

          <form className="w-full max-w-xs flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
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
