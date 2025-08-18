// AxiosInstance.js
import axios from "axios";
import { BASEURL } from "./ApiPaths"; // e.g., https://book-library-management-mern.onrender.com

const LOGIN_ROUTE = "/auth/login";

const AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // ✅ important for sending cookies
});

// Global response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Unauthorized. Redirecting to login.");
        if (window.location.pathname !== LOGIN_ROUTE) {
          window.location.href = LOGIN_ROUTE;
        }
      }

      if (status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
