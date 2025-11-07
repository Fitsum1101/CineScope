import axios from "axios";

export const cineScopeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if you’re using auth cookies or JWT
});
