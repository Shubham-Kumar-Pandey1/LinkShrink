import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { shortenUrl, fetchUserLinks } from "../api/user.js";
import { FiClock } from "react-icons/fi";
import { LuLink2 } from "react-icons/lu";
import { IoIosStats } from "react-icons/io";

const Dashboard = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [feature, setFeature] = useState("none");
  const [password, setPassword] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("User");
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0, memberSince: "" });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || "User");
        fetchStats();
      } catch (err) {
        console.error("Token error:", err);
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const response = await fetchUserLinks();
      const totalLinks = response.length;
      const totalClicks = response.reduce((sum, link) => sum + (link.clicks || 0), 0);
      const memberSince = new Date(response[0]?.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      setStats({ totalLinks, totalClicks, memberSince });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!originalUrl) {
      setError("Please enter a URL.");
      return;
    }

    const payload = {
      originalUrl,
      feature,
      password: feature === "password" ? password : undefined,
      maxClicks: feature === "maxclicks" ? parseInt(maxClicks) : undefined,
    };

    try {
      const response = await shortenUrl(payload);
      setSuccessMessage(`Shortened URL: https://url-shortener-server-afo7.onrender.com/${response.shortUrl}`);
      setOriginalUrl("");
      setPassword("");
      setMaxClicks("");
      fetchStats(); // update stats after successful URL creation
    } catch (err) {
      setError(err.response?.data?.message || "Error shortening URL");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarComponent />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {username.toLowerCase()} 👋
        </h1>
        <p className="text-gray-400 mb-8">
          Manage your short links easily and track performance.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#0e0e1c] rounded-2xl p-4 flex items-center space-x-4">
            <LuLink2 className="text-purple-500 text-2xl" />
            <div>
              <div className="text-gray-400 text-sm">Total Links</div>
              <div className="text-lg font-semibold">{stats.totalLinks}</div>
            </div>
          </div>
          <div className="bg-[#0e0e1c] rounded-2xl p-4 flex items-center space-x-4">
            <IoIosStats className="text-green-500 text-2xl" />
            <div>
              <div className="text-gray-400 text-sm">Clicks</div>
              <div className="text-lg font-semibold">{stats.totalClicks}</div>
            </div>
          </div>
          <div className="bg-[#0e0e1c] rounded-2xl p-4 flex items-center space-x-4">
            <FiClock className="text-yellow-500 text-2xl" />
            <div>
              <div className="text-gray-400 text-sm">Member Since</div>
              <div className="text-lg font-semibold">{stats.memberSince || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#0e0e1c] rounded-2xl p-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-400">Original URL</label>
            <input
              type="url"
              placeholder="Enter your long URL here"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full p-3 rounded-lg bg-black text-white focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-400">Select Feature</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setFeature("none")}
                className={`px-4 py-2 rounded-lg border ${feature === "none" ? "border-purple-500 text-purple-500" : "border-gray-600 text-gray-400"}`}
              >
                None
              </button>
              <button
                type="button"
                onClick={() => setFeature("onetime")}
                className={`px-4 py-2 rounded-lg border ${feature === "onetime" ? "border-purple-500 text-purple-500" : "border-gray-600 text-gray-400"}`}
              >
                One-Time Access
              </button>
              <button
                type="button"
                onClick={() => setFeature("password")}
                className={`px-4 py-2 rounded-lg border ${feature === "password" ? "border-purple-500 text-purple-500" : "border-gray-600 text-gray-400"}`}
              >
                Password Protected
              </button>
              <button
                type="button"
                onClick={() => setFeature("maxclicks")}
                className={`px-4 py-2 rounded-lg border ${feature === "maxclicks" ? "border-purple-500 text-purple-500" : "border-gray-600 text-gray-400"}`}
              >
                Max Clicks
              </button>
            </div>
          </div>

          {feature === "password" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-400">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-black text-white focus:outline-none"
              />
            </div>
          )}

          {feature === "maxclicks" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-400">Max Clicks</label>
              <input
                type="number"
                placeholder="Enter maximum clicks"
                value={maxClicks}
                onChange={(e) => setMaxClicks(e.target.value)}
                className="w-full p-3 rounded-lg bg-black text-white focus:outline-none"
              />
            </div>
          )}

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Generate Short URL 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
