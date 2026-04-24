import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const raw = localStorage.getItem("cart") || "[]";
		try {
			setItems(JSON.parse(raw));
		} catch (e) {
			setItems([]);
		}
	}, []);

	const persist = (next) => {
		setItems(next);
		localStorage.setItem("cart", JSON.stringify(next));
	};

	const updateQuantity = (id, delta) => {
		const next = items.map((it) =>
			it.id === id
				? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) }
				: it,
		);
		persist(next);
	};

	const removeItem = (id) => {
		const next = items.filter((it) => it.id !== id);
		persist(next);
	};

	const clearCart = () => {
		persist([]);
	};

	const total = items.reduce(
		(s, it) => s + (it.price || 0) * (it.quantity || 1),
		0,
	);

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">Your Cart</h2>
				<div className="text-gray-600">{items.length} item(s)</div>
			</div>

			{items.length === 0 ? (
				<div className="text-gray-600">Your shopping cart is empty.</div>
			) : (
				<div className="space-y-4">
					<div className="bg-white border rounded shadow overflow-hidden">
						{items.map((it) => (
							<div
								key={it.id}
								className="flex items-center gap-4 p-4 border-b last:border-b-0">
								<img
									src={it.thumbnail}
									alt={it.title}
									className="w-20 h-20 object-contain rounded"
								/>
								<div className="flex-1">
									<div className="font-medium text-gray-900">{it.title}</div>
									<div className="text-sm text-gray-600">${it.price} each</div>
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={() => updateQuantity(it.id, -1)}
										className="px-2 py-1 bg-gray-200 rounded">
										-
									</button>
									<div className="px-3">{it.quantity || 1}</div>
									<button
										onClick={() => updateQuantity(it.id, 1)}
										className="px-2 py-1 bg-gray-200 rounded">
										+
									</button>
								</div>
								<div className="w-32 text-right font-medium">
									${((it.price || 0) * (it.quantity || 1)).toFixed(2)}
								</div>
								<button
									onClick={() => removeItem(it.id)}
									className="ml-4 text-sm text-red-600">
									Remove
								</button>
							</div>
						))}
					</div>

					<div className="flex items-center justify-between">
						<div>
							<button onClick={clearCart} className="text-sm text-red-600">
								Clear cart
							</button>
						</div>
						<div className="text-right">
							<div className="text-sm text-gray-600">Subtotal</div>
							<div className="text-2xl font-bold">${total.toFixed(2)}</div>
						</div>
					</div>

					<div className="flex justify-end">
						<Link
							to="/"
							className="inline-block bg-indigo-600 text-white px-4 py-2 rounded">
							Continue shopping
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
