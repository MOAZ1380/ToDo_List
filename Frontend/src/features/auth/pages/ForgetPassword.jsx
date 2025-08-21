import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function ForgetPassword() {
	return (
		<AuthLayout title="Reset Password">
			<form className="space-y-4">
				<input
					type="email"
					placeholder="Enter your email"
					className="w-full p-2 border rounded"
				/>
				<button
					type="submit"
					className="w-full bg-yellow-500 text-white py-2 rounded">
					Send Reset Link
				</button>
			</form>
			<div className="mt-4 text-sm text-center">
				Remembered?{" "}
				<Link to="/signin" className="text-blue-600">
					Sign In
				</Link>
			</div>
		</AuthLayout>
	);
}
