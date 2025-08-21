import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function SignUp() {
	return (
		<AuthLayout title="Sign Up">
			<form className="space-y-4">
				<input
					type="text"
					placeholder="Name"
					className="w-full p-2 border rounded"
				/>
				<input
					type="email"
					placeholder="Email"
					className="w-full p-2 border rounded"
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full p-2 border rounded"
				/>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 rounded">
					Sign Up
				</button>
			</form>
			<div className="mt-4 text-sm text-center">
				Already have an account?{" "}
				<Link to="/signin" className="text-blue-600">
					Sign In
				</Link>
			</div>
		</AuthLayout>
	);
}
