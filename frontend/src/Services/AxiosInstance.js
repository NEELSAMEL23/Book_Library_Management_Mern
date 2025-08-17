import axios from "axios";
import { BASEURL } from "./ApiPaths";

// Define login route
const LOGIN_ROUTE = "/auth/login";

const AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // ✅ important for sending cookies
});

// Global response error handling
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Token invalid or expired
      if (status === 401) {
        console.warn("Unauthorized. Redirecting to login.");
        // Redirect to login page if not already there
        if (window.location.pathname !== LOGIN_ROUTE) {
          window.location.href = LOGIN_ROUTE;
        }
      }

      if (status === 500) {
        console.error("Server error occurred. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
