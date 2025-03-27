const Contact = () => {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          {/* Left Side - Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
  
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
  
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  placeholder="Write your message..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
  
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white font-medium py-3 rounded-lg transition duration-200 hover:bg-gray-800"
              >
                Send Message
              </button>
            </form>
          </div>
  
          {/* Right Side - Welcome Message */}
          <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl font-bold">Let's Connect! 📬</h2>
            <p className="mt-2 text-center">
              Have any queries or suggestions? Feel free to reach out.  
              We're here to help! 🚀
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Contact;
  