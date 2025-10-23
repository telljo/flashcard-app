import axios from "axios";
import toast from "react-hot-toast";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Request setup error (rare)
    toast.error("Error setting up request.");
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    const message =
      data?.error?.message?.[0] ||
      data?.error?.message ||
      data?.message ||
      "Something went wrong. Please try again.";

      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login?message=Unauthorized. Please log in again.";
      } else if (status === 403) {
        toast.error("You don’t have permission to perform this action.");
      } else if (status === 404) {
        toast.error("Resource not found.");
      } else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(message);
      }

      return Promise.reject(error);
    }
)


export default api;
