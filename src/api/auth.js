import axios from "axios";
// ENV
const LOGIN_URL = import.meta.env.VITE_REACT_APP_LOGIN;
const SIGNUP_URL = import.meta.env.VITE_REACT_APP_SIGNUP;
const LOGOUT_URL = import.meta.env.VITE_REACT_APP_LOGOUT;
// LOGIN
export const login = async (useremail, userpassword) => {
  try {
    const response = await axios.post(LOGIN_URL, {useremail,userpassword},{ withCredentials: true });
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
        { withCredentials: true } 
      ).then(data => console.log(data))
  
      console.log("Signup successful:", response?.data || "No response data");
      return response?.data;
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };
// LOGOUT
export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true });
    
    // Remove tokens
    localStorage.removeItem("jwt"); 
    return true;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    return false;
  }
};