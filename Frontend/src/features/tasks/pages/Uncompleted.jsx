import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findAll, create, update, remove } from "../services/tasksAPi";

const priorityColors = {
	High: "bg-red-100 text-red-600",
	Medium: "bg-yellow-100 text-yellow-600",
	Low: "bg-green-100 text-green-600",
};

const Uncompleted = () => {
	const { listId } = useParams();
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [newPriority, setNewPriority] = useState("Low");
	const [error, setError] = useState("");

	// search
	const [search, setSearch] = useState("");

	// pagination
	const [page, setPage] = useState(1);
	const [limit] = useState(5);
	const [totalPages, setTotalPages] = useState(1);

	// fetch tasks
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const options = { page, limit };
				if (search) options.search = search;

				const res = await findAll(listId, options);
				if (res.data?.status === "success") {
					setTasks(res.data.data || []);
					if (res.data.meta) setTotalPages(res.data.meta.totalPages);
				}
			} catch {
				setError("⚠️ Failed to load tasks.");
			}
		};
		fetchTasks();
	}, [listId, search, page, limit]);

	// create task
	const handleCreate = async (e) => {
		e.preventDefault();
		if (!newTask.trim()) return;
		try {
			const res = await create(listId, {
				description: newTask,
				priority: newPriority,
				status: "Pending",
			});
			if (res.data?.status === "success") {
				setTasks((prev) => [res.data.data, ...prev]);
				setNewTask("");
				setNewPriority("Low");
			}
		} catch {
			setError("⚠️ task must be at least 5 characters long.");
		}
	};

	// delete
	const handleDelete = async (id) => {
		try {
			await remove(listId, id);
			setTasks((prev) => prev.filter((t) => t._id !== id));
		} catch {
			setError("⚠️ Failed to delete task.");
		}
	};

	// toggle complete
	const handleComplete = async (id) => {
		try {
			const task = tasks.find((t) => t._id === id);
			const res = await update(listId, id, {
				completed: true,
				status: "Completed",
			});
			if (res.data?.status === "success") {
				setTasks((prev) => prev.filter((t) => t._id !== id)); // remove from list
			}
		} catch {
			setError("⚠️ Failed to update task.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-indigo-600 flex items-center gap-2">
						📋 My Tasks
					</h1>
					<div className="space-x-3">
						<button
							onClick={() => navigate(`/lists/${listId}/completed`)}
							className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
							✅ Completed
						</button>

						<button
							onClick={() => navigate(`/lists`)}
							className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow">
							📋 Back to Lists
						</button>
					</div>
				</div>

				{error && (
					<div className="bg-red-100 text-red-600 p-2 rounded mb-4">
						{error}
					</div>
				)}

				{/* Search */}
				<div className="mb-6">
					<input
						type="text"
						value={search}
						onChange={(e) => {
							setPage(1);
							setSearch(e.target.value);
						}}
						placeholder="🔍 Search tasks..."
						className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
					/>
				</div>

				{/* Add Task */}
				<form
					onSubmit={handleCreate}
					className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md mb-6">
					<input
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						placeholder="Enter new task..."
						className="flex-1 border p-2 rounded-lg"
					/>
					<select
						value={newPriority}
						onChange={(e) => setNewPriority(e.target.value)}
						className="border p-2 rounded-lg">
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
					<button
						type="submit"
						className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg shadow">
						Add
					</button>
				</form>

				{/* Task List */}
				{(page === 1) & (tasks.length === 0) ? (
					<p className="text-gray-500 text-center">🚫 No tasks yet.</p>
				) : (
					<ul className="space-y-4">
						{tasks.map((task) => (
							<li
								key={task._id}
								className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">
								<div>
									<p className="font-medium text-lg">{task.description}</p>
									<span
										className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
											priorityColors[task.priority]
										}`}>
										{task.priority} Priority
									</span>
								</div>
								<div className="flex gap-2">
									<button
										onClick={() => handleComplete(task._id)}
										className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg shadow">
										Done
									</button>
									<button
										onClick={() => handleDelete(task._id)}
										className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow">
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Uncompleted;
