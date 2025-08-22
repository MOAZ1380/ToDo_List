import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authApi";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!name || !email || !password) {
			setError("All fields are required.");
			return;
		}

		try {
			await signup({ name, email, password });
			navigate("/verify-signup"); // بعد التسجيل يروح لصفحة التحقق
		} catch (err) {
			console.error("Sign-up error:", err);
			setError("Failed to create an account.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				<h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
					Create a New Account
				</h1>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Name"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition">
						Sign Up
					</button>
				</form>

				{error && (
					<div className="text-red-500 text-sm text-center mt-3">{error}</div>
				)}

				<div className="flex justify-between mt-6 text-sm text-gray-600">
					<Link to="/signin" className="hover:text-blue-600 transition">
						Already have an account?
					</Link>
					<Link to="/forget" className="hover:text-blue-600 transition">
						Forgot password?
					</Link>
				</div>
			</div>
		</div>
	);
}
