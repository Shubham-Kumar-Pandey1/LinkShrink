import React, { useEffect, useState, useMemo } from "react";
import { fetchUserLinks } from "../api/user.js";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

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

  // 🏆 Memoized Summary Stats (Performance Optimization)
  const totalClicks = useMemo(() => links.reduce((acc, link) => acc + link.clicks, 0), [links]);
  const passwordProtectedCount = useMemo(() => links.filter((link) => link.passwordProtected).length, [links]);
  const oneTimeAccessCount = useMemo(() => links.filter((link) => link.oneTimeAccess).length, [links]);

  // 📊 Data for Bar Chart (Enhanced Colors & Styling)
  const barChartData = {
    labels: links.map((link) => link.shortId),
    datasets: [
      {
        label: "Clicks",
        data: links.map((link) => Math.round(link.clicks)), // Ensure integer values
        backgroundColor: "#facc15", // Yellow bars
        borderColor: "#fbbf24", // Slightly darker yellow border
        borderRadius: 8, // Rounded bars
        borderWidth: 1.5,
        hoverBackgroundColor: "#fbbf24",
      },
    ],
  };

  // 🎯 Graph Options (Better Readability)
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white", // White legend text
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" }, // White X-axis labels
        grid: { color: "gray" }, // Light gray grid lines
      },
      y: {
        ticks: {
          stepSize: 1, // Only whole numbers
          beginAtZero: true,
          color: "white", // White Y-axis labels
        },
        grid: { color: "gray" }, // Light gray grid lines
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavbarComponent />

      <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4">📊 Analytics Dashboard</h2>

        {loading && <p className="text-center text-gray-400">Loading analytics...</p>}
        {error && <p className="text-center text-red-500">❌ {error}</p>}

        {!loading && !error && links.length === 0 && (
          <p className="text-center text-gray-400">No links created yet.</p>
        )}

        {!loading && links.length > 0 && (
          <>
            {/* 📊 Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div className="bg-gray-700 p-4 rounded-md shadow-md">
                <p className="text-lg font-semibold">🔗 Total Links</p>
                <p className="text-2xl font-bold text-yellow-400">{links.length}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-md shadow-md">
                <p className="text-lg font-semibold">📈 Total Clicks</p>
                <p className="text-2xl font-bold text-green-400">{totalClicks}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-md shadow-md">
                <p className="text-lg font-semibold">🔒 Password Protected</p>
                <p className="text-2xl font-bold text-red-400">{passwordProtectedCount}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-md shadow-md">
                <p className="text-lg font-semibold">🎯 One-Time Links</p>
                <p className="text-2xl font-bold text-blue-400">{oneTimeAccessCount}</p>
              </div>
            </div>

            {/* 📊 Clicks Graph */}
            <div className="bg-gray-700 p-6 rounded-md mb-6 shadow-md">
              <h3 className="text-xl font-bold text-center mb-4">📊 Clicks per Link</h3>
              <div className="h-64">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>

            {/* 📋 URL Table */}
            <div className="overflow-x-auto">
              <h3 className="text-xl font-bold text-center mb-4">🔗 URL Details</h3>
              <table className="table-auto w-full border-collapse border border-gray-600 rounded-md">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2">Short ID</th>
                    <th className="border border-gray-600 px-4 py-2">Shortened URL</th>
                    <th className="border border-gray-600 px-4 py-2">Clicks</th>
                    <th className="border border-gray-600 px-4 py-2">Original URL</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link, index) => (
                    <tr
                      key={link._id}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600 transition`}
                    >
                      <td className="border border-gray-600 px-4 py-2">{link.shortId}</td>
                      <td className="border border-gray-600 px-4 py-2">
                        <a
                          href={`https://url-shortener-server-afo7.onrender.com/${link.shortId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          https://url-shortener-server-afo7.onrender.com/{link.shortId}
                        </a>
                      </td>
                      <td className="border border-gray-600 px-4 py-2 font-bold text-green-400">
                        {link.clicks}
                      </td>
                      <td className="border border-gray-600 px-4 py-2 truncate max-w-[300px]">
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          {link.originalUrl}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
