import "./App.css";
import { useState, useContext } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Favorites from "./components/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

function AppContent() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const location = useLocation();

	// Don't show Header and Footer on login/register pages
	const showLayout = !location.pathname.match(/\/(login|register)/);

	return (
		<div className="min-h-screen flex flex-col">
			{showLayout && (
				<Header
					onSearch={setSearchQuery}
					onCategoryChange={setSelectedCategory}
				/>
			)}
			<main className="flex-1">
				<Routes>
					{/* Public routes */}
					<Route
						path="/"
						element={
							<Product
								searchQuery={searchQuery}
								selectedCategory={selectedCategory}
							/>
						}
					/>
					<Route path="/product/:id" element={<ProductDetails />} />

					{/* Private routes */}
					<Route
						path="/favorites"
						element={
							<ProtectedRoute>
								<Favorites />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>

					{/* Auth routes (guests only) */}
					<Route
						path="/login"
						element={
							<GuestRoute>
								<Login />
							</GuestRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<GuestRoute>
								<Register />
							</GuestRoute>
						}
					/>
				</Routes>
			</main>
			{showLayout && (
				<>
					<Footer />
					<ScrollToTop />
				</>
			)}
		</div>
	);
}

function App() {
	return (
		<AuthProvider>
			<FavoritesProvider>
				<Router>
					<AppContent />
				</Router>
			</FavoritesProvider>
		</AuthProvider>
	);
}

export default App;
