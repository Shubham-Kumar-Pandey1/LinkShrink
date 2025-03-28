import axios from "axios";

const LOGIN_URL = import.meta.env.VITE_REACT_APP_LOGIN;
const SIGNUP_URL = import.meta.env.VITE_REACT_APP_SIGNUP;

// LOGIN
export const login = async (useremail, userpassword) => {
  try {
    const response = await axios.post(LOGIN_URL, {useremail,userpassword});
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};    

// SIGNUP
export const signup = async (username, useremail, userpassword) => {
    try {
      const response = await axios.post(
        SIGNUP_URL,
        { username, useremail, userpassword },
        { withCredentials: true } // ✅ Ensures cookies are sent
      );
  
      console.log("Signup successful:", response?.data || "No response data");
      return response?.data;
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };
