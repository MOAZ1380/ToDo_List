import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { verifyForgetPassword } from "../services/authApi";

export default function VerifyForgetPasswordPage() {
	const [otp, setOtp] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleVerify = async (e) => {
		e.preventDefault();
		try {
			const res = await verifyForgetPassword({ otp });
			setMessage(res.data.message);
			localStorage.setItem("resetToken", res.data.token);
			navigate("/reset-password");
		} catch (err) {
			setError(err.response?.data?.message || "Verification failed");
		}
	};

	return (
		<AuthLayout title="Verify Code (Forget Password)">
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
					className="w-full bg-yellow-500 text-white py-2 rounded">
					Verify
				</button>
			</form>
			{message && <p className="mt-4 text-green-600">{message}</p>}
			{error && <p className="mt-4 text-red-600">{error}</p>}
		</AuthLayout>
	);
}
