import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserUrlsById, deleteUser } from "../api/admin";
import { FiTrash2, FiEye } from "react-icons/fi";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import NavbarComponent from "../components/NavbarComponent.jsx";

const AdminAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserUrls, setSelectedUserUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    loadUsers();
  }, []);

  const handleViewUrls = async (userId) => {
    setLoading(true);
    setSelectedUserId(userId);
    setSelectedUserUrls([]);
    try {
      const urls = await fetchUserUrlsById(userId);
      setSelectedUserUrls(urls);
    } catch (error) {
      console.error("Error fetching user URLs", error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      if (selectedUserId === userId) {
        setSelectedUserUrls([]);
        setSelectedUserId(null);
      }
    }
  };

  const userCount = users.length;
  const chartData = [{ name: "Users", value: userCount }];

  return (
    <div className="bg-black text-white min-h-screen">
      <NavbarComponent />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <span className="text-purple-400">📊</span> Admin Dashboard
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Stats Card */}
          <div className="w-full lg:w-1/3 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-400">👥</span> User Statistics
            </h2>
            <div className="flex flex-col items-center">
              <PieChart width={200} height={200}>
                <Pie 
                  data={chartData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={80} 
                  fill="#8b5cf6"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  <Cell key="users" fill="#8b5cf6" />
                </Pie>
                <Tooltip />
              </PieChart>
              <p className="mt-4 text-lg text-purple-400">Total Users: {userCount}</p>
            </div>
          </div>

          {/* User Table */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-400">👨‍💻</span> User Management
            </h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700 text-left">
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleViewUrls(user._id)} 
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                          >
                            <FiEye /> <span>View URLs</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user._id)} 
                            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                          >
                            <FiTrash2 /> <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* URLs Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-400">🔗</span> User URLs 
            {selectedUserId && (
              <span className="text-sm text-gray-400">
                (for {users.find(u => u._id === selectedUserId)?.email || "selected user"})
              </span>
            )}
          </h2>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-400">
              <span className="animate-pulse">⏳</span> Loading URLs...
            </div>
          ) : (
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              {selectedUserUrls.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {selectedUserId ? (
                    <>
                      <p className="text-4xl mb-2">📭</p>
                      <p>This user hasn't created any URLs yet.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-4xl mb-2">👆</p>
                      <p>Select a user to view their URLs</p>
                    </>
                  )}
                </div>
              ) : (
                <ul className="space-y-2">
                  {selectedUserUrls.map((url) => (
                    <li key={url._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700/50 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-blue-400">🔗 {url.shortUrl}</span>
                          <span className="mx-2 text-gray-500">→</span>
                          <span className="text-gray-300 break-all">{url.originalUrl}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;