import React, { useEffect, useState } from "react";
import { getProducts } from "../../Api/index";
import ProductCard from "../ProductCard/ProductCard";

const Product = ({ searchQuery = "", selectedCategory = "" }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getProducts().then((data) => {
			setProducts(data);
			setLoading(false);
		});
	}, []);

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === "" || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const ProductSkeleton = () => (
		<div className="bg-white border border-gray-200 rounded-lg shadow-sm">
			<div className="p-6">
				<div className="h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
				<div className="space-y-2 mb-4">
					<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
					<div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
						<div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
					</div>
					<div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="bg-white py-8 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-6">
					<h1 className="text-2xl font-semibold text-gray-900 mb-2">
						Products
					</h1>
					<p className="text-gray-600 text-sm">Browse our collection</p>
				</div>
				{loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, index) => (
							<ProductSkeleton key={index} />
						))}
					</div>
				) : filteredProducts.length === 0 ? (
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
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-1">
							No products found
						</h3>
						<p className="text-gray-500 text-sm max-w-sm mx-auto">
							We couldn't find any products matching your search. Try adjusting
							your search terms or browse our full collection.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Product;
