import { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    usermessage: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    setIsSuccess(false);

    const response = await sendContactMessage(formData);

    setLoading(false);
    if (response.success) {
      setIsSuccess(true);
      setResponseMessage("✅ Your message has been received successfully! We’ll review it soon.");
      setFormData({ username: "", useremail: "", usermessage: "" }); // Clear form
    } else {
      setIsSuccess(false);
      setResponseMessage("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        
        {/* Left Side - Form */}
        <div className="md:w-1/2 p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>

          {responseMessage && (
            <p className={`text-center mb-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
              {responseMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 p-3">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 p-3">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="useremail"
                  placeholder="Enter your email"
                  value={formData.useremail}
                  onChange={handleChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Message</label>
              <div className="flex items-start border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 p-3">
                <FaCommentDots className="text-gray-500 mr-2 mt-1" />
                <textarea
                  name="usermessage"
                  placeholder="Write your message..."
                  rows="4"
                  value={formData.usermessage}
                  onChange={handleChange}
                  className="w-full outline-none resize-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right Side - Welcome Message */}
        <div className="md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-6 md:p-8 text-center">
          <h2 className="text-3xl font-bold">Let's Connect! 📬</h2>
          <p className="mt-2">
            Have any queries or suggestions? Feel free to reach out.  
            We're here to help! 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// Helper function to send request
const sendContactMessage = async (formData) => {
  try {
    console.log(import.meta.env.VITE_APP_CONTACT_URL)
    const response = await fetch(import.meta.env.VITE_APP_CONTACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};
