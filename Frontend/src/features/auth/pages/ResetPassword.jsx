import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { resetPassword } from "../services/authApi";

export default function ResetPasswordPage() {
	const [newPassword, setNewPassword] = useState("");
	const [renewPassword, setRenewPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleReset = async (e) => {
		e.preventDefault();
		if (newPassword !== renewPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const token = localStorage.getItem("resetToken"); // جاي من verifyForget
			const res = await resetPassword(
				{ newpassword: newPassword, renewpassword: renewPassword },
				token,
			);
			setMessage(res.data.message);
			localStorage.removeItem("resetToken");
			navigate("/signin");
		} catch (err) {
			setError(err.response?.data?.message || "Reset failed");
		}
	};

	return (
		<AuthLayout title="Reset Password">
			<form onSubmit={handleReset} className="space-y-4">
				<input
					type="password"
					placeholder="New Password"
					className="w-full p-2 border rounded"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirm New Password"
					className="w-full p-2 border rounded"
					value={renewPassword}
					onChange={(e) => setRenewPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="w-full bg-green-600 text-white py-2 rounded">
					Reset Password
				</button>
			</form>
			{message && <p className="mt-4 text-green-600">{message}</p>}
			{error && <p className="mt-4 text-red-600">{error}</p>}
		</AuthLayout>
	);
}
