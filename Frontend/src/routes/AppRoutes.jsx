import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../features/auth/pages/SignIn";
import SignUp from "../features/auth/pages/SignUp";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import VerifySignupPage from "../features/auth/pages/VerifySignup";
import VerifyForgetPasswordPage from "../features/auth/pages/VerifyForgetPassword";
import ResetPasswordPage from "../features/auth/pages/ResetPassword";
import Lists from "../features/lists/pages/lists";
import Task from "../features/tasks/pages/Task";

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				{/* route --> auth */}
				<Route path="/" element={<Navigate to="/signin" />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/forget" element={<ForgetPassword />} />
				<Route path="/verify-signup" element={<VerifySignupPage />} />
				<Route path="/verify-forget" element={<VerifyForgetPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
				{/* route --> list */}
				<Route path="/lists" element={<Lists />} />

				{/* route --> task */}
				<Route path="/lists/:listId/tasks" element={<Task />} />
			</Routes>
		</BrowserRouter>
	);
}
