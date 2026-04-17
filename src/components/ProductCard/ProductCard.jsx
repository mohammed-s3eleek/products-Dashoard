// import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";

const ProductCard = ({ product }) => {
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
	const favorite = isFavorite(product.id);

	const handleFavoriteClick = () => {
		if (favorite) {
			removeFromFavorites(product.id);
		} else {
			addToFavorites(product);
		}
	};

	return (
		<Link to={`/product/${product.id}`} className="block">
			<div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
				<div className="p-6">
					<div className="relative mb-4">
						<img
							src={product.thumbnail}
							alt={product.title}
							className="h-48 w-full object-contain rounded-lg"
						/>
						<button
							type="button"
							aria-pressed={favorite}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleFavoriteClick();
							}}
							className={`absolute top-2 right-2 rounded-full p-2 transition ${
								favorite
									? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
									: "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
							}`}>
							<span className="text-lg">{favorite ? "★" : "☆"}</span>
						</button>
					</div>

					<div className="space-y-2 mb-4">
						<h2 className="text-base font-medium text-gray-900 line-clamp-2 leading-tight">
							{product.title}
						</h2>
						<p className="text-sm text-gray-600 uppercase tracking-wide">
							{product.category}
						</p>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-yellow-500 text-sm">⭐</span>
							<span className="text-sm text-gray-700">{product.rating}</span>
						</div>
						<span className="text-lg font-semibold text-gray-900">
							${product.price}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
