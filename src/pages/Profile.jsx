import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
	const { user } = useContext(AuthContext);

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Profile</h2>
			{user ? (
				<div className="bg-white p-6 rounded-lg shadow">
					<p className="font-medium">Name: {user.name}</p>
					<p className="text-sm text-gray-500">Email: {user.email}</p>
				</div>
			) : (
				<p className="text-gray-600">No user data available.</p>
			)}
		</div>
	);
}
