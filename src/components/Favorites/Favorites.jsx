import React from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import ProductCard from "../ProductCard/ProductCard";

const Favorites = () => {
	const { favorites } = useFavorites();

	return (
		<div className="bg-white py-8 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-6">
					<h1 className="text-2xl font-semibold text-gray-900 mb-2">
						Favorite Products
					</h1>
					<p className="text-gray-600 text-sm">
						Your favorite products ({favorites.length})
					</p>
				</div>
				{favorites.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-8 h-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-1">
							No favorite products yet
						</h3>
						<p className="text-gray-500 text-sm max-w-sm mx-auto">
							Start adding products to your favorites by clicking the star
							button on product cards.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{favorites.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Favorites;
