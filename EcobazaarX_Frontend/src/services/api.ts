import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081", // ✅ your Spring Boot backend base URL
});

// ✅ Add a request interceptor to attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: handle 401 errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid → logout user
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/signin"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
