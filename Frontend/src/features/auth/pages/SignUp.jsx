import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { signup } from "../services/authApi";
import { useState } from "react";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			setError("All fields are required.");
			return;
		}

		try {
			// Call signup API
			await signup({ name, email, password });

			navigate("/verify-signup");
		} catch (error) {
			console.error("Sign-up error:", error);
			setError("Failed to create an account.");
		}

		// Clear form fields
		setName("");
		setEmail("");
		setPassword("");
	};

	return (
		<AuthLayout title="Sign Up">
			<form className="space-y-4" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Name"
					className="w-full p-2 border rounded"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					className="w-full p-2 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full p-2 border rounded"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 rounded">
					Sign Up
				</button>
			</form>
			{error && <div className="mt-4 text-red-500">{error}</div>}
			<div className="mt-4 text-sm text-center">
				Already have an account?{" "}
				<Link to="/signin" className="text-blue-600">
					Sign In
				</Link>
			</div>
		</AuthLayout>
	);
}
