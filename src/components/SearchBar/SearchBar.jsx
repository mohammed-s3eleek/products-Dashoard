import React from "react";
import { useState } from "react";
const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleChange = (e) => {
		setQuery(e.target.value);
		onSearch(e.target.value);
	};

	const clearSearch = () => {
		setQuery("");
		onSearch("");
	};

	return (
		<div
			className={`flex items-center gap-3 bg-white border rounded-lg px-4 h-10 w-80 transition-colors ${
				isFocused ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"
			}`}>
			<svg
				className="w-4 h-4 text-gray-400 shrink-0"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24">
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>

			<input
				type="text"
				value={query}
				onChange={handleChange}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder="Search products..."
				className="flex-1 text-sm bg-transparent outline-none text-gray-900 placeholder-gray-500"
			/>

			{query && (
				<button
					onClick={clearSearch}
					className="text-gray-400 hover:text-gray-600 transition-colors">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						strokeWidth={2.5}
						viewBox="0 0 24 24">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default SearchBar;
