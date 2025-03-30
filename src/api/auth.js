import axios from "axios";
import Cookies from "js-cookie"; // Ensure consistency

// ENV
const LOGIN_URL = import.meta.env.VITE_REACT_APP_LOGIN;
const SIGNUP_URL = import.meta.env.VITE_REACT_APP_SIGNUP;
const LOGOUT_URL = import.meta.env.VITE_REACT_APP_LOGOUT;

// LOGIN
export const login = async (useremail, userpassword) => {
  try {
    const response = await axios.post(LOGIN_URL, { useremail, userpassword }, { withCredentials: true });
    
    // Extract JWT token from response or cookies
    const token = response.data.token || Cookies.get("jwt");
    if (token) {
      localStorage.setItem("jwt", token);
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// SIGNUP
export const signup = async (username, useremail, userpassword) => {
  try {
    const response = await axios.post(SIGNUP_URL, { username, useremail, userpassword }, { withCredentials: true });

    // Extract JWT from response or cookies
    const token = response.data.token || Cookies.get("jwt");
    if (token) {
      localStorage.setItem("jwt", token);
    }

    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

// LOGOUT
export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true });

    // Remove JWT from localStorage
    localStorage.removeItem("jwt");
    Cookies.remove("jwt");

    return true;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    return false;
  }
};
