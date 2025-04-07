import React, { useEffect, useState } from "react";
import { fetchUserLinks, deleteUserLinks } from "../api/user.js";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { 
  FaCopy, 
  FaTrash, 
  FaLink, 
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMousePointer,
  FaRegClock,
  FaFire
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  useEffect(() => {
    const getLinks = async () => {
      try {
        const data = await fetchUserLinks();
        // Sort by creation date (newest first)
        const sortedLinks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLinks(sortedLinks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getLinks();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("🚀 Link copied to clipboard!");
  };

  const handleDelete = async (shortId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this URL?");
    if (!confirmDelete) return;

    try {
      setDeleting(shortId);
      await deleteUserLinks(shortId);
      setLinks(links.filter((link) => link.shortId !== shortId));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleting("");
    }
  };

  // Function to format date as "Today", "Yesterday", or specific date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarComponent />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <FaLink className="mr-3 text-purple-500" />
              Your Links
            </h1>
            <p className="text-gray-400 mt-2">
              Manage all your shortened URLs in one place
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <FaRegClock className="text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-medium">Recently Created</span>
            <span className="mx-2 text-gray-500">|</span>
            <FiClock className="text-purple-400 mr-2" />
            <span className="text-gray-400">{new Date().toLocaleDateString("en-GB")}</span>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-[#0e0e1c] rounded-2xl p-6 shadow-lg border border-gray-800">
          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-6 text-red-500">
              ❌ Error loading links: {error}
            </div>
          )}

          {!loading && !error && links.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <div className="inline-block p-4 rounded-full bg-gray-900 mb-3">
                <FaLink className="text-4xl text-purple-500" />
              </div>
              <p className="text-xl">No links created yet</p>
              <p className="text-gray-500 mt-1">Create your first shortened URL</p>
            </div>
          )}

          {!loading && links.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="pb-4 text-left pl-4">Short ID</th>
                    <th className="pb-4 text-left">Destination</th>
                    <th className="pb-4 text-center">
                      <div className="flex items-center justify-center">
                        <FaMousePointer className="mr-2" />
                        Clicks
                      </div>
                    </th>
                    <th className="pb-4 text-center">
                      <div className="flex items-center justify-center">
                        <FaCalendarAlt className="mr-2" />
                        Created
                      </div>
                    </th>
                    <th className="pb-4 text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="py-4 pl-4">
                        <div className="flex items-center">
                          <span className="font-mono text-purple-400">{link.shortId}</span>
                          {link.clicks > 10 && (
                            <span className="ml-2 flex items-center text-yellow-400 text-sm">
                              <FaFire className="mr-1" />
                              Hot
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="truncate max-w-[200px] md:max-w-[300px] text-gray-300">
                          {link.originalUrl}
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          link.clicks > 10 ? "bg-purple-900/50 text-purple-300" : "bg-gray-800 text-gray-300"
                        }`}>
                          {link.clicks}
                        </span>
                      </td>
                      <td className="py-4 text-center text-gray-400">
                        <div className="flex items-center justify-center">
                          <FiClock className="mr-2 text-purple-400" />
                          {formatDate(link.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 text-right pr-4">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => copyToClipboard(`https://url-shortener-server-afo7.onrender.com/${link.shortId}`)}
                            className="p-2 rounded-lg bg-gray-800 hover:bg-purple-900/50 text-gray-300 hover:text-purple-300 transition-colors"
                            title="Copy"
                          >
                            <FaCopy />
                          </button>
                          <button
                            onClick={() => handleDelete(link.shortId)}
                            className={`p-2 rounded-lg bg-gray-800 hover:bg-red-900/50 text-gray-300 hover:text-red-400 transition-colors ${
                              deleting === link.shortId ? "opacity-50" : ""
                            }`}
                            title="Delete"
                            disabled={deleting === link.shortId}
                          >
                            {deleting === link.shortId ? (
                              <span className="animate-spin">⏳</span>
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                          <a
                            href={`https://url-shortener-server-afo7.onrender.com/${link.shortId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                            title="Open"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;