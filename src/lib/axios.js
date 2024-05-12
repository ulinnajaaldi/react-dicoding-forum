import axios from "axios";
import { API_URL } from "@/constants/config";
import { getAccessToken } from "@/utils";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const axiosInstanceWithAuth = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});
