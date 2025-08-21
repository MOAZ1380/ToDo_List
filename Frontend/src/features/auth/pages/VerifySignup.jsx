import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { verifySignup } from "../services/authApi";

export default function VerifySignupPage() {
	const [otp, setOtp] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleVerify = async (e) => {
		e.preventDefault();
		try {
			const res = await verifySignup({ otp });
			setMessage(res.data.message);
			localStorage.setItem("token", res.data.token);
			navigate("/signin");
		} catch (err) {
			setError(err.response?.data?.message || "Verification failed");
		}
	};

	return (
		<AuthLayout title="Verify Email">
			<form onSubmit={handleVerify} className="space-y-4">
				<input
					type="text"
					placeholder="Enter OTP"
					className="w-full p-2 border rounded"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 rounded">
					Verify
				</button>
			</form>
			{message && <p className="mt-4 text-green-600">{message}</p>}
			{error && <p className="mt-4 text-red-600">{error}</p>}
		</AuthLayout>
	);
}
