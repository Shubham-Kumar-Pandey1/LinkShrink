import axios from "axios";
// ENv
const SHORTEN_URL = import.meta.env.VITE_SHORTEN_API_URL; // API base URL from env

export const shortenUrl = async (formData, token) => {
  try {
    const response = await axios.post(SHORTEN_URL, formData,{withCredentials: true});
    return response.data; // { success: true, shortUrl: shortId }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create short URL");
  }
};
