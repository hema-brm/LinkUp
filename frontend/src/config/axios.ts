import axios from "axios";
import { API_BASE_URL } from "./api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});