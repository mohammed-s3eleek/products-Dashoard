import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductById } from "../../Api/index";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [addedCount, setAddedCount] = useState(0);

	useEffect(() => {
		setLoading(true);
		getProductById(id).then((data) => {
			setProduct(data);
			setLoading(false);
		});
	}, [id]);

	const addToCart = (product) => {
		try {
			const raw = localStorage.getItem("cart") || "[]";
			const items = JSON.parse(raw);
			const idx = items.findIndex((i) => i.id === product.id);
			if (idx >= 0) {
				items[idx].quantity = (items[idx].quantity || 1) + 1;
			} else {
				items.push({ ...product, quantity: 1 });
			}
			localStorage.setItem("cart", JSON.stringify(items));
			setAddedCount((c) => c + 1);
		} catch (err) {
			console.error("addToCart error", err);
		}
	};

	if (loading) {
		return (
			<div className="bg-white py-8 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="animate-pulse">
						<div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
						<div className="space-y-4">
							<div className="h-8 bg-gray-200 rounded w-3/4"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							<div className="h-4 bg-gray-200 rounded w-1/4"></div>
							<div className="h-32 bg-gray-200 rounded"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="bg-white py-8 px-6">
				<div className="max-w-4xl mx-auto text-center py-16">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						Product Not Found
					</h2>
					<p className="text-gray-600">
						The product you're looking for doesn't exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 py-8 px-6">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<img
							src={product.thumbnail}
							alt={product.title}
							className="w-full h-96 object-contain rounded-lg border"
						/>
						<div className="grid grid-cols-4 gap-2 mt-4">
							{product.images?.slice(0, 4).map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`${product.title} ${index + 1}`}
									className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-75"
								/>
							))}
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								{product.title}
							</h1>
							<p className="text-lg text-gray-600 uppercase">
								{product.category}
							</p>
						</div>

						<div className="flex items-center gap-4">
							<div className="mt-4 flex items-center gap-3">
								<button
									type="button"
									onClick={() => addToCart(product)}
									className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-lg text-base font-semibold">
									<FaShoppingCart className="w-5 h-5" />
									Add to cart
								</button>
								{addedCount > 0 && (
									<span className="text-sm text-amber-600">
										Added {addedCount}×
									</span>
								)}
							</div>
							<div className="flex items-center gap-2">
								<span className="text-yellow-500 text-lg">⭐</span>
								<span className="text-lg font-medium">{product.rating}</span>
							</div>
							<span className="text-2xl font-bold text-gray-900">
								${product.price}
							</span>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Description
							</h3>
							<p className="text-gray-700 leading-relaxed">
								{product.description}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<h4 className="font-medium text-gray-900">Brand</h4>
								<p className="text-gray-600">{product.brand}</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900">Stock</h4>
								<p className="text-gray-600">{product.stock} available</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900">Warranty</h4>
								<p className="text-gray-600">{product.warrantyInformation}</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900">Shipping</h4>
								<p className="text-gray-600">{product.shippingInformation}</p>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Reviews
							</h3>
							<div className="space-y-3">
								{product.reviews?.slice(0, 3).map((review, index) => (
									<div key={index} className="border rounded p-3">
										<div className="flex items-center gap-2 mb-1">
											<span className="font-medium">{review.reviewerName}</span>
											<div className="flex">
												{[...Array(5)].map((_, i) => (
													<span
														key={i}
														className={`text-sm ${
															i < review.rating
																? "text-yellow-500"
																: "text-gray-300"
														}`}>
														★
													</span>
												))}
											</div>
										</div>
										<p className="text-sm text-gray-600">{review.comment}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
