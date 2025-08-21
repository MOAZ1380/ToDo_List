import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const signin = (data) => axios.post(`${API_URL}/login`, data);

export const forgetPassword = (data) =>
	axios.post(`${API_URL}/ForgetPassword`, data);

export const verifySignup = (data) =>
	axios.post(`${API_URL}/VerifySignup`, data);

export const verifyForgetPassword = (data) =>
	axios.post(`${API_URL}/VerifyForgetPassword`, data);

export const resetPassword = (data, token) =>
	axios.post(`${API_URL}/ResetPassword`, data, {
		headers: { Authorization: `Bearer ${token}` },
	});
