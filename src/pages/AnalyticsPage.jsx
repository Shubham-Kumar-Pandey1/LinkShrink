import React, { useEffect, useState, useMemo } from "react";
import { fetchUserLinks } from "../api/user.js";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { 
  FaLink, 
  FaChartLine, 
  FaLock, 
  FaBolt,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaFire
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const AnalyticsPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLinks = async () => {
      try {
        const data = await fetchUserLinks();
        setLinks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getLinks();
  }, []);

  // Memoized stats calculations
  const { totalClicks, passwordProtectedCount, oneTimeAccessCount, topLinks } = useMemo(() => {
    const total = links.reduce((acc, link) => acc + link.clicks, 0);
    const protectedCount = links.filter(link => link.passwordProtected).length;
    const oneTimeCount = links.filter(link => link.oneTimeAccess).length;
    const top = [...links].sort((a, b) => b.clicks - a.clicks).slice(0, 3);
    
    return {
      totalClicks: total,
      passwordProtectedCount: protectedCount,
      oneTimeAccessCount: oneTimeCount,
      topLinks: top
    };
  }, [links]);

  // Chart data with enhanced styling
  const barChartData = {
    labels: links.map(link => link.shortId),
    datasets: [{
      label: "Clicks",
      data: links.map(link => link.clicks),
      backgroundColor: "#8b5cf6", // Purple-500
      borderColor: "#7c3aed", // Purple-600
      borderRadius: 6,
      borderWidth: 1,
      hoverBackgroundColor: "#7c3aed",
    }]
  };

  // Chart options with dark theme
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#e2e8f0", // Light text
          font: { size: 14 }
        }
      },
      tooltip: {
        backgroundColor: "#1e293b", // Dark tooltip
        titleColor: "#f8fafc",
        bodyColor: "#e2e8f0",
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        ticks: { 
          color: "#94a3b8", // Gray-400
          maxRotation: 45,
          minRotation: 45
        },
        grid: { color: "#334155" } // Gray-700
      },
      y: {
        ticks: { 
          color: "#94a3b8",
          stepSize: 1 
        },
        grid: { color: "#334155" }
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <NavbarComponent />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <FaChartLine className="mr-3 text-purple-400" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Track and analyze your link performance
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-900/50 px-4 py-2 rounded-full">
            <FiClock className="text-purple-400" />
            <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">
            ❌ Error loading analytics: {error}
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="mx-auto w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <FaLink className="text-2xl text-purple-400" />
            </div>
            <h3 className="text-xl font-medium mb-1">No links available</h3>
            <p className="text-gray-400">Create links to see analytics data</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-900/40 to-black p-5 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-3">
                  <FaLink className="text-2xl text-purple-400" />
                  <div>
                    <div className="text-gray-400">Total Links</div>
                    <div className="text-2xl font-bold">{links.length}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-black p-5 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-3">
                  <FaChartLine className="text-2xl text-green-400" />
                  <div>
                    <div className="text-gray-400">Total Clicks</div>
                    <div className="text-2xl font-bold text-green-400">{totalClicks}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-black p-5 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-3">
                  <FaLock className="text-2xl text-yellow-400" />
                  <div>
                    <div className="text-gray-400">Protected</div>
                    <div className="text-2xl font-bold text-yellow-400">{passwordProtectedCount}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-black p-5 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-3">
                  <FaBolt className="text-2xl text-blue-400" />
                  <div>
                    <div className="text-gray-400">One-Time</div>
                    <div className="text-2xl font-bold text-blue-400">{oneTimeAccessCount}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            {topLinks.length > 0 && (
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <FaFire className="text-yellow-400 mr-2" />
                  Top Performing Links
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topLinks.map(link => (
                    <div key={link._id} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-purple-400">{link.shortId}</span>
                        <span className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-sm">
                          {link.clicks} clicks
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 truncate mb-3" title={link.originalUrl}>
                        {link.originalUrl}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          <FaCalendarAlt className="inline mr-1" />
                          {new Date(link.createdAt).toLocaleDateString()}
                        </span>
                        <a 
                          href={`https://url-shortener-server-afo7.onrender.com/${link.shortId}`}
                          target="_blank"
                          rel="noopener"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chart Section */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Clicks Overview</h2>
              <div className="h-80">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>

            {/* All Links Table */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold flex items-center">
                  <FaLink className="mr-2 text-purple-400" />
                  All Links
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 text-left">
                      <th className="p-4 pl-6">Short ID</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4 text-center">Clicks</th>
                      <th className="p-4">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map(link => (
                      <tr key={link._id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="p-4 pl-6 font-mono text-purple-400">{link.shortId}</td>
                        <td className="p-4">
                          <a 
                            href={link.originalUrl} 
                            target="_blank"
                            rel="noopener"
                            className="text-gray-300 hover:text-white flex items-center"
                          >
                            <span className="truncate max-w-xs">{link.originalUrl}</span>
                            <FaExternalLinkAlt className="ml-2 text-sm opacity-70" />
                          </a>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            link.clicks > 10 ? 'bg-purple-900/30 text-purple-300' : 'bg-gray-800/50 text-gray-300'
                          }`}>
                            {link.clicks}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">
                          <div className="flex items-center space-x-2">
                            <FiClock className="text-purple-400/70" />
                            <span className="text-sm">
                              {new Date(link.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;