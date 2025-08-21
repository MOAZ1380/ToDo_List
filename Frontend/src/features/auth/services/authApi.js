import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // غيّرها حسب الـ backend

export const signin = (data) => axios.post(`${API_URL}/signin`, data);
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const forgetPassword = (data) => axios.post(`${API_URL}/forget`, data);
