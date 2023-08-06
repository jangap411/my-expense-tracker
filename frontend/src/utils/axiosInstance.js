import axios from "axios";

// API URL
const API = process.env.REACT_APP_API_URL;

const headers = {
  contentType: "application/json",
};

export const axiosInstance = axios.create({
  baseURL: API,
  timeout: 25000,
  headers: headers,
});
