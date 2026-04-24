import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
	const navigate = useNavigate();
	const { register } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
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
		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.passwordConfirm
		) {
			setError("Please fill in all fields");
			setLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long");
			setLoading(false);
			return;
		}

		if (formData.password !== formData.passwordConfirm) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			await register(
				formData.name,
				formData.email,
				formData.password,
				formData.passwordConfirm,
			);
			navigate("/login");
		} catch (err) {
			setError(err.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
						Create Account
					</h2>

					{/* Error Message */}
					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-red-700 text-sm font-medium">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Name Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								placeholder="John Doe"
								value={formData.name}
								onChange={handleChange}
								disabled={loading}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
							/>
						</div>

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
							<p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
						</div>

						{/* Confirm Password Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								name="passwordConfirm"
								placeholder="••••••••"
								value={formData.passwordConfirm}
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
							{loading ? "Creating account..." : "Register"}
						</button>
					</form>

					{/* Login Link */}
					<p className="mt-6 text-center text-gray-600">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-600 hover:text-blue-700 font-semibold transition">
							Login here
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
						<strong>Registration is free!</strong> Create an account to save
						your favorite products.
					</p>
				</div>
			</div>
		</div>
	);
}
