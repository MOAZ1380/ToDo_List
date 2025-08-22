import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				<h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
					Reset Your Password
				</h1>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Enter your email"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						type="submit"
						className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 rounded-lg transition">
						Send Reset Link
					</button>
				</form>

				{error && (
					<div className="text-red-500 text-sm text-center mt-3">{error}</div>
				)}

				<div className="mt-6 text-sm text-center text-gray-600">
					Remembered?{" "}
					<Link to="/signin" className="hover:text-blue-600 transition">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}
