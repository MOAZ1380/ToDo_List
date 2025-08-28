import axios from "axios";

const API_URL = "http://localhost:4000/api/list";

const authHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// جلب كل الـ tasks
export const findAll = (listId, options = {}) => {
	const { page, limit, sort, fields, search } = options;
	const params = new URLSearchParams();

	if (page) params.append("page", page);
	if (limit) params.append("limit", limit);
	if (sort) params.append("sort", sort);
	if (fields) params.append("fields", fields);
	if (search) params.append("search", search);

	return axios.get(`${API_URL}/${listId}/task?${params.toString()}`, {
		headers: authHeader(),
	});
};

export const create = (listId, taskData) =>
	axios.post(`${API_URL}/${listId}/task`, taskData, { headers: authHeader() });

export const update = (listId, id, data) =>
	axios.put(`${API_URL}/${listId}/task/${id}`, data, { headers: authHeader() });

export const remove = (listId, id) =>
	axios.delete(`${API_URL}/${listId}/task/${id}`, { headers: authHeader() });

export const complete = (listId, id) =>
	axios.put(
		`${API_URL}/${listId}/task/${id}`,
		{ completed: true, status: "Completed" },
		{ headers: authHeader() },
	);

export const getCompletedTasks = (listId, options = {}) => {
	const { page, limit, sort, fields, search } = options;
	const params = new URLSearchParams();

	if (page) params.append("page", page);
	if (limit) params.append("limit", limit);
	if (sort) params.append("sort", sort);
	if (fields) params.append("fields", fields);
	if (search) params.append("search", search);

	return axios.get(`${API_URL}/${listId}/task/completed?${params.toString()}`, {
		headers: authHeader(),
	});
};
