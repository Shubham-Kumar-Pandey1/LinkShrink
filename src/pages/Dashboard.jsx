import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { shortenUrl } from "../api/user.js";
import { FaLink, FaLock, FaChartLine, FaRegClock, FaMagic } from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [feature, setFeature] = useState("none");
  const [password, setPassword] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("User");

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
      const shortUrl = `https://url-shortener-server-afo7.onrender.com/${response.shortUrl}`;
      setSuccessMessage(
        `Short URL Created: <a href="${shortUrl}" target="_blank" rel="noopener noreferrer" class="text-purple-400 underline">${shortUrl}</a>`
      );
      setOriginalUrl("");
      setFeature("none");
      setPassword("");
      setMaxClicks("");
    } catch (err) {
      setError(err.message || "Failed to create short URL");
    }
  };

  const featureOptions = [
    { value: "none", label: "None", icon: <FaLink /> },
    { value: "oneTimeAccess", label: "One-Time", icon: <FiZap /> },
    { value: "passwordProtected", label: "Password", icon: <FaLock /> },
    { value: "maxClicks", label: "Max Clicks", icon: <FaChartLine /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavbarComponent />

      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl border border-gray-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
              <FaMagic className="text-purple-400" />
              Welcome back, {username}!
            </h1>
            <p className="text-gray-400 mt-2">Create and manage your short URLs</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div
              className="mb-4 p-3 bg-green-900/30 text-green-300 rounded-lg text-center"
              dangerouslySetInnerHTML={{ __html: successMessage }}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2 flex items-center gap-2">
                <FaLink className="text-purple-400" />
                Original URL
              </label>
              <input
                type="url"
                required
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-white"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">URL Features</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {featureOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleFeatureChange(option.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                      feature === option.value
                        ? "border-purple-500 bg-purple-900/20 text-purple-300"
                        : "border-gray-700 hover:border-gray-600 bg-gray-800"
                    }`}
                  >
                    <span className="text-xl mb-1">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {feature === "passwordProtected" && (
              <div>
                <label className="block text-gray-400 mb-2 flex items-center gap-2">
                  <FaLock className="text-purple-400" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-white"
                  placeholder="Enter password"
                />
              </div>
            )}

            {feature === "maxClicks" && (
              <div>
                <label className="block text-gray-400 mb-2 flex items-center gap-2">
                  <FaChartLine className="text-purple-400" />
                  Max Clicks
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={maxClicks}
                  onChange={(e) => setMaxClicks(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 text-white"
                  placeholder="Enter number"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg font-medium text-white transition-all duration-200 mt-4"
            >
              Generate Short URL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;