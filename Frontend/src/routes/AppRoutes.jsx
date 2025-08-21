import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../features/auth/pages/SignIn";
import SignUp from "../features/auth/pages/SignUp";
import ForgetPassword from "../features/auth/pages/ForgetPassword";

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/signin" />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/forget" element={<ForgetPassword />} />
			</Routes>
		</BrowserRouter>
	);
}
