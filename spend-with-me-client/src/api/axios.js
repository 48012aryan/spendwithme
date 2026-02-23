import axios from "axios";
import { encryptPayload, decryptPayload, encryptToken } from "../utils/crypto";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/user", // Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Encrypt Body & Token
apiClient.interceptors.request.use((config) => {
  // 1. Encrypt Body Data
  if (config.data) {
    config.data = encryptPayload(config.data);
  }

  // 2. Encrypt Authorization Token
  const token = localStorage.getItem("token");
  if (token) {
    const encryptedToken = encryptToken(token);
    config.headers.Authorization = `Bearer ${encryptedToken}`;
  }

  return config;
});

// Response Interceptor: Decrypt the Response
apiClient.interceptors.response.use(
  (response) => {
    // The backend overrides res.json to send an encrypted string
    if (typeof response.data === "string") {
      response.data = decryptPayload(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;