import axios from "axios";
// ENv
const SHORTEN_URL = import.meta.env.VITE_SHORTEN_API_URL; // API base URL from env
const ViewAllUrls = import.meta.env.VITE_ViewAll_API_URL;
const deleteUserUrl = import.meta.env.VITE_deleteUserLinks;
export const shortenUrl = async (formData, token) => {
  try {
    const response = await axios.post(SHORTEN_URL, formData,{withCredentials: true});
    return response.data; // { success: true, shortUrl: shortId }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create short URL");
  }
};

export const fetchUserLinks = async()=>{
  try {
    const response = await axios.get(ViewAllUrls,{withCredentials: true});
    return response.data.urls; // Return user URLs
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create short URL");
  }
}
// Delete a specific shortened URL
export const deleteUserLinks = async (shortId) => {
  try {
    const response = await axios.delete(`${deleteUserUrl}/${shortId}`, {
      withCredentials: true,
    });
    return response.data; // Return response message
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete URL");
  }
};
