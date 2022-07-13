import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mern-e-commerce-first-app-1.herokuapp.com"
})