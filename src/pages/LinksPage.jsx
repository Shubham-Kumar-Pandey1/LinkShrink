import React, { useEffect, useState } from "react";
import { fetchUserLinks, deleteUserLinks } from "../api/user.js";
import NavbarComponent from "../components/NavbarComponent.jsx";
import { FaCopy, FaTrash } from "react-icons/fa";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

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

  // Copy link to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("🔗 Link copied to clipboard!");
  };

  // Delete URL
  const handleDelete = async (shortId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this URL?");
    if (!confirmDelete) return;

    try {
      setDeleting(shortId); // Show loading state
      await deleteUserLinks(shortId);

      // Optimistically update UI
      setLinks(links.filter((link) => link.shortId !== shortId));
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleting("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <NavbarComponent />

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4">🔗 Your Shortened Links</h2>

        {loading && <p className="text-center text-gray-600 dark:text-gray-400 animate-pulse">Loading links...</p>}
        {error && <p className="text-center text-red-500">❌ {error}</p>}

        {!loading && !error && links.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No links created yet.</p>
        )}

        {!loading && links.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-300 dark:border-gray-700 mt-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Short ID</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Original URL</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Clicks</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Shortened Link</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, index) => (
                  <tr key={link._id} className={`text-center ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}`}>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{link.shortId}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 truncate max-w-[250px]">
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {link.originalUrl}
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{link.clicks}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <a
                        href={`http://localhost:8000/${link.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        http://localhost:8000/{link.shortId}
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 flex justify-center gap-3">
                      {/* Copy Button */}
                      <button
                        onClick={() => copyToClipboard(`http://localhost:8000/${link.shortId}`)}
                        className="btn btn-sm btn-outline dark:border-gray-400 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <FaCopy />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(link.shortId)}
                        className={`btn btn-sm btn-outline btn-error ${
                          deleting === link.shortId ? "loading" : ""
                        }`}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksPage;
