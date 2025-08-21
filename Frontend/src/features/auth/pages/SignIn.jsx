import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { signin } from "../services/authApi";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// Perform sign-in logic here
		if (!email || !password) {
			setError("Email and password are required.");
			return;
		}

		// Call the signin API
		signin({ email, password }).catch((error) => {
			console.error("Sign-in error:", error);
			setError("Invalid email or password.");
		});
	};

	return (
		<AuthLayout title="Sign In">
			<form className="space-y-4" onSubmit={handleSubmit}>
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
					className="w-full bg-blue-500 text-white py-2 rounded">
					Sign In
				</button>
			</form>
			{error && <div className="text-red-500">{error}</div>}
			<div className="flex justify-between mt-4 text-sm">
				<Link to="/forget" className="text-blue-600">
					Forgot password?
				</Link>
				<Link to="/signup" className="text-blue-600">
					Create account
				</Link>
			</div>
		</AuthLayout>
	);
}
