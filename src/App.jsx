import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Favorites from "./components/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	return (
		<FavoritesProvider>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Header
						onSearch={setSearchQuery}
						onCategoryChange={setSelectedCategory}
					/>
					<main className="flex-1">
						<Routes>
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
							<Route path="/favorites" element={<Favorites />} />
						</Routes>
					</main>
					<Footer />
					<ScrollToTop />
				</div>
			</Router>
		</FavoritesProvider>
	);
}

export default App;
