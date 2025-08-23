import axios from "axios";

const API_URL = "http://localhost:4000/api/list";

const authHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const findAll = async (options = {}) => {
	const { page, limit, sort, fields, search } = options;

	const params = new URLSearchParams();
	if (page) params.append("page", page);
	if (limit) params.append("limit", limit);
	if (sort) params.append("sort", sort);
	if (fields) params.append("fields", fields);
	if (search) params.append("search", search);

	return await axios.get(`${API_URL}?${params.toString()}`, {
		headers: authHeader(),
	});
};

export const create = async (listData) => {
	return await axios.post(API_URL, listData, {
		headers: authHeader(),
	});
};
export const deleteList = async (listId) => {
	return await axios.delete(`${API_URL}/${listId}`, {
		headers: authHeader(),
	});
};

export const updateList = async (listId, updatedData) => {
	return await axios.put(`${API_URL}/${listId}`, updatedData, {
		headers: authHeader(),
	});
};
