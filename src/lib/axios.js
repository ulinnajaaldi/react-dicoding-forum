import axios from "axios";
import { API_URL } from "@/constants/config";
import { getAccessToken } from "@/utils";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const axiosInstanceWithAuth = axios.create({
  baseURL: API_URL,
});

axiosInstanceWithAuth.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
