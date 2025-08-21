export default function AuthLayout({ title, children }) {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
				<h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
				{children}
			</div>
		</div>
	);
}
