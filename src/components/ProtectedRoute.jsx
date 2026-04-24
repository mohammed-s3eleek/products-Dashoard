import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="inline-block">
						<div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
					</div>
					<p className="mt-4 text-gray-600 font-medium">Loading...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		// preserve attempted URL in location.state.from for redirect after login
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
}
