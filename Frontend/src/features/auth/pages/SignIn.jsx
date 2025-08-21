import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function SignIn() {
	return (
		<AuthLayout title="Sign In">
			<form className="space-y-4">
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
					className="w-full bg-blue-500 text-white py-2 rounded">
					Sign In
				</button>
			</form>
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
