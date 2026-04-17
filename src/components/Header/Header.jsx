import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../Api/index";
import SearchBar from "../SearchBar/SearchBar";

const Header = ({ onSearch, onCategoryChange }) => {
	const [categories, setCategories] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data);
		});
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				!event.target.closest(".category-dropdown") &&
				!event.target.closest(".mobile-menu")
			) {
				setIsDropdownOpen(false);
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleCategorySelect = (categorySlug) => {
		setSelectedCategory(categorySlug);
		onCategoryChange(categorySlug);
		setIsDropdownOpen(false);
	};

	const handleAllCategories = () => {
		setSelectedCategory("");
		onCategoryChange("");
		setIsDropdownOpen(false);
	};
	return (
		<header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					{/* Logo/Title */}
					<h1 className="text-lg sm:text-xl font-semibold text-gray-900">
						Shop Dashboard
					</h1>

					{/* Desktop Search and Category */}
					<div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
						{/* Category Dropdown */}
						<div className="relative category-dropdown">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors w-full">
								<span className="truncate">
									{categories.find((c) => c.slug === selectedCategory)?.name ||
										"All Categories"}
								</span>
								<svg
									className={`w-4 h-4 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{isDropdownOpen && (
								<div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
									<div className="py-1">
										<button
											onClick={handleAllCategories}
											className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
											All Categories
										</button>
										{categories.map((category) => (
											<button
												key={category.slug}
												onClick={() => handleCategorySelect(category.slug)}
												className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors capitalize">
												{category.name}
											</button>
										))}
									</div>
								</div>
							)}
						</div>

						<SearchBar onSearch={onSearch} />
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6 lg:gap-8">
						<Link
							to="/"
							className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
							Products
						</Link>
						<Link
							to="/favorites"
							className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
							Favorites
						</Link>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d={
									isMobileMenuOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden mt-4 pb-4 border-t border-gray-200 mobile-menu">
						<div className="pt-4 space-y-4">
							{/* Mobile Search */}
							<SearchBar onSearch={onSearch} />

							{/* Mobile Category Dropdown */}
							<div className="relative category-dropdown">
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
									<span className="truncate">
										{categories.find((c) => c.slug === selectedCategory)
											?.name || "All Categories"}
									</span>
									<svg
										className={`w-4 h-4 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								{isDropdownOpen && (
									<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
										<div className="py-1">
											<button
												onClick={handleAllCategories}
												className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
												All Categories
											</button>
											{categories.map((category) => (
												<button
													key={category.slug}
													onClick={() => handleCategorySelect(category.slug)}
													className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors capitalize">
													{category.name}
												</button>
											))}
										</div>
									</div>
								)}
							</div>

							{/* Mobile Navigation */}
							<nav className="flex flex-col space-y-2">
								<Link
									to="/"
									className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}>
									Products
								</Link>
								<Link
									to="/favorites"
									className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
									onClick={() => setIsMobileMenuOpen(false)}>
									Favorites
								</Link>
							</nav>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
