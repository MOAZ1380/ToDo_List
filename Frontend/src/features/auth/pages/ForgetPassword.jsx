import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useState } from "react";
import { forgetPassword } from "../services/authApi";

export default function ForgetPassword() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!email) {
			setError("Email is required.");
			return;
		}

		try {
			await forgetPassword({ email });
			navigate("/verify-forget");
		} catch (err) {
			console.error("Forget password error:", err);
			setError("Failed to send reset link. Please try again.");
		}
	};

	return (
		<AuthLayout title="Reset Password">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Enter your email"
					className="w-full p-2 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					type="submit"
					className="w-full bg-yellow-500 text-white py-2 rounded">
					Send Reset Link
				</button>
			</form>

			{error && <div className="mt-4 text-red-500">{error}</div>}

			<div className="mt-4 text-sm text-center">
				Remembered?{" "}
				<Link to="/signin" className="text-blue-600">
					Sign In
				</Link>
			</div>
		</AuthLayout>
	);
}
