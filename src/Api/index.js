import axios from "axios";

const api = axios.create({
	baseURL: "https://dummyjson.com",
});

export const getProducts = async () => {
	try {
		const res = await api.get("https://dummyjson.com/products?limit=100");
		return res.data.products;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getProductById = async (id) => {
	try {
		const res = await api.get(`https://dummyjson.com/products/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getCategories = async () => {
	try {
		const res = await api.get("https://dummyjson.com/products/categories");
		return res.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};
