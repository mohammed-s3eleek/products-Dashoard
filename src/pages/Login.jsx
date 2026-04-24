import { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setError(""); // Clear error when user starts typing
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		// Validation
		if (!formData.email || !formData.password) {
			setError("Please fill in all fields");
			setLoading(false);
			return;
		}

		try {
			await login(formData.email, formData.password);
			// Redirect to the page the user attempted to access, or default to /
			const redirectTo = location.state?.from?.pathname || "/";
			navigate(redirectTo, { replace: true });
		} catch (err) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
						Login
					</h2>

					{/* Error Message */}
					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-red-700 text-sm font-medium">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Email Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								value={formData.email}
								onChange={handleChange}
								disabled={loading}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
							/>
						</div>

						{/* Password Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								placeholder="••••••••"
								value={formData.password}
								onChange={handleChange}
								disabled={loading}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:hover:scale-100">
							{loading ? "Logging in..." : "Login"}
						</button>
					</form>

					{/* Register Link */}
					<p className="mt-6 text-center text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-blue-600 hover:text-blue-700 font-semibold transition">
							Register here
						</Link>
					</p>

					{/* Back to Home */}
					<p className="mt-3 text-center">
						<Link
							to="/"
							className="text-gray-600 hover:text-gray-700 text-sm transition">
							← Back to home
						</Link>
					</p>
				</div>

				{/* Info Box */}
				<div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
					<p className="text-sm text-blue-800">
						<strong>Demo credentials:</strong> Use any email and password to
						register and login.
					</p>
				</div>
			</div>
		</div>
	);
}
