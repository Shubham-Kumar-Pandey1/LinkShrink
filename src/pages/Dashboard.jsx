import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { shortenUrl } from "../api/user.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [feature, setFeature] = useState("none");
  const [password, setPassword] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("User");

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || "User");
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [navigate]);

  const handleFeatureChange = (selectedFeature) => {
    setFeature(selectedFeature);
    setPassword("");
    setMaxClicks("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = {
      originalUrl,
      oneTimeAccess: feature === "oneTimeAccess",
      passwordProtected: feature === "passwordProtected",
      password: feature === "passwordProtected" ? password : undefined,
      maxClicks: feature === "maxClicks" ? Number(maxClicks) : undefined,
    };

    try {
      const response = await shortenUrl(formData);
      const shortUrl = `http://localhost:8000/${response.shortUrl}`;
      setSuccessMessage(
        `Short URL Created: <a href="${shortUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${shortUrl}</a>`
      );
      setOriginalUrl("");
      setFeature("none");
      setPassword("");
      setMaxClicks("");
    } catch (err) {
      setError(err.message || "Failed to create short URL");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Navbar */}
      <NavbarComponent />

      {/* Dashboard Content */}
      <div className="flex justify-center items-center flex-1 p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 border border-gray-300">
          <h2 className="text-3xl font-bold text-center mb-2">✨ Welcome, {username}!</h2>
          <h3 className="text-lg text-center mb-4 text-gray-600">Create Your Short URL</h3>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Success Message */}
          {successMessage && (
            <p
              className="text-green-500 text-sm text-center"
              dangerouslySetInnerHTML={{ __html: successMessage }}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Original URL */}
            <div>
              <label className="block text-sm font-semibold mb-1">🔗 Original URL:</label>
              <input
                type="url"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="input input-bordered w-full mt-1 bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                placeholder="Enter the original URL"
              />
            </div>

            {/* Feature Selection */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">🎯 Select Feature:</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { value: "none", label: "🚫 None" },
                  { value: "oneTimeAccess", label: "🎟️ One-Time Access" },
                  { value: "passwordProtected", label: "🔑 Password Protected" },
                  { value: "maxClicks", label: "📊 Max Clicks" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                      feature === value ? "bg-blue-200 border border-blue-500" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="feature"
                      value={value}
                      checked={feature === value}
                      onChange={() => handleFeatureChange(value)}
                      className="radio radio-primary"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Password Input (Only for Password Protected Feature) */}
            {feature === "passwordProtected" && (
              <div>
                <label className="block text-sm font-semibold mb-1">🔑 Set Password:</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full mt-1 bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  placeholder="Enter a password"
                />
              </div>
            )}

            {/* Max Clicks Input (Only for Max Clicks Feature) */}
            {feature === "maxClicks" && (
              <div>
                <label className="block text-sm font-semibold mb-1">📊 Set Max Clicks:</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={maxClicks}
                  onChange={(e) => setMaxClicks(e.target.value)}
                  className="input input-bordered w-full mt-1 bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  placeholder="Enter max clicks"
                />
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-4 text-lg">
              🚀 Generate Short URL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
