import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Main Container with Blurry Border */}
      <div className="relative flex w-[800px] h-[450px] shadow-lg rounded-lg overflow-hidden border border-transparent before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-white/50 before:blur-xl before:pointer-events-none">

        {/* Left Side - Login Form (Moved Here) */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Login</h3>

          <form className="w-full max-w-xs">
            <div className="mb-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Login
            </button>
          </form>

          <p className="text-sm mt-3">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-medium">Sign Up</Link>
          </p>
        </div>

        {/* Right Side - Welcome Text (Moved Here) */}
        <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl font-bold">WELCOME BACK!</h2>
          <p className="text-sm mt-3 text-gray-300 text-center">
            LinkShrink – Shorten, secure, and track your links effortlessly! 🚀
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
