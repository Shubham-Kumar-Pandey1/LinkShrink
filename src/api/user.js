import axios from "axios";
// ENv
const SHORTEN_URL = import.meta.env.VITE_SHORTEN_API_URL; // API base URL from env
const ViewAllUrls = import.meta.env.VITE_ViewAll_API_URL;
const deleteUserUrl = import.meta.env.VITE_deleteUserLinks;
export const shortenUrl = async (formData) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(SHORTEN_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create short URL");
  }
};

export const fetchUserLinks = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(ViewAllUrls, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    return response.data.urls;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch URLs");
  }
};

export const deleteUserLinks = async (shortId) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.delete(`${deleteUserUrl}/${shortId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete URL");
  }
};

