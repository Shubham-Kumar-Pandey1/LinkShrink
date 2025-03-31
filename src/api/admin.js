import axios from "axios";

// API Endpoints from environment variables
const BASE_ADMIN_API = import.meta.env.VITE_VIEW_USERS_API;

/**
 * Fetch all users (Admin only)
 */
export const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(BASE_ADMIN_API, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data.users;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

/**
 * Delete a user (Admin only)
 */
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.delete(`${BASE_ADMIN_API}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

/**
 * Fetch URLs created by a specific user (Admin only)
 */
export const fetchUserUrlsById = async (userId) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${BASE_ADMIN_API}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data.urls;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user URLs");
  }
};
