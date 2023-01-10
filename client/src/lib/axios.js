import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://stationary-store.onrender.com"
})

//https://stationary-store.onrender.com
//localhost:8000