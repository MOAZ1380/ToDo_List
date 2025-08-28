import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findAll, create, update, remove } from "../services/tasksAPi";

const Tasks = () => {
	const { listId } = useParams();
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [newPriority, setNewPriority] = useState("Low");
	const [error, setError] = useState("");

	// search فقط
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
					if (res.data.meta) {
						setTotalPages(res.data.meta.totalPages);
					}
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
			const newCompleted = !task.completed;
			const newStatus = newCompleted ? "Completed" : "Pending";

			const res = await update(listId, id, {
				completed: newCompleted,
				status: newStatus,
			});

			if (res.data?.status === "success") {
				setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
			}
		} catch {
			setError("⚠️ Failed to update task.");
		}
	};

	// update priority
	const handleUpdatePriority = async (id, priority) => {
		try {
			const res = await update(listId, id, { priority });
			if (res.data?.status === "success") {
				setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
			}
		} catch {
			setError("⚠️ Failed to update priority.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-indigo-600 mb-6">
					📋 Tasks for List
				</h1>

				{error && (
					<div className="bg-red-100 text-red-600 p-2 rounded mb-4">
						{error}
					</div>
				)}

				{/* Search فقط */}
				<div className="flex gap-3 mb-6">
					<input
						type="text"
						value={search}
						onChange={(e) => {
							setPage(1); // رجع للصفحة الأولى لو غير البحث
							setSearch(e.target.value);
						}}
						placeholder="🔍 Search tasks..."
						className="flex-1 border p-2 rounded"
					/>
				</div>

				<form
					onSubmit={handleCreate}
					className="flex items-center gap-2 bg-white p-3 rounded shadow mb-6">
					<input
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						placeholder="Enter task title..."
						className="flex-1 border p-2 rounded"
					/>
					<select
						value={newPriority}
						onChange={(e) => setNewPriority(e.target.value)}
						className="border p-2 rounded">
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
					<button
						type="submit"
						className="bg-indigo-500 text-white px-4 py-2 rounded">
						Add
					</button>
				</form>

				{tasks.length === 0 ? (
					<p className="text-gray-500">🚫 No tasks yet.</p>
				) : (
					<>
						<ul className="space-y-3">
							{tasks.map((task) => (
								<li
									key={task._id}
									className="bg-white p-4 rounded shadow flex justify-between items-center">
									<div>
										<p
											className={`font-medium ${
												task.completed ? "line-through text-gray-400" : ""
											}`}>
											{task.description}
										</p>
										<small className="text-gray-500">
											Priority: {task.priority}
										</small>
									</div>
									<div className="flex gap-2">
										<button
											onClick={() => handleComplete(task._id)}
											className="px-2 py-1 text-xs bg-green-500 text-white rounded">
											{task.completed ? "Undo" : "Complete"}
										</button>

										<button
											onClick={() => {
												handleDelete(task._id);
											}}
											className="px-2 py-1 text-xs bg-red-500 text-white rounded">
											Delete
										</button>
										<select
											value={task.priority}
											onChange={(e) =>
												handleUpdatePriority(task._id, e.target.value)
											}
											className="border rounded p-1 text-gray-600 text-xs">
											<option value="Low">Low</option>
											<option value="Medium">Medium</option>
											<option value="High">High</option>
										</select>
									</div>
								</li>
							))}
						</ul>

						{/* Pagination Controls */}
						<div className="flex justify-center items-center gap-3 mt-6">
							<button
								disabled={page === 1}
								onClick={() => setPage((p) => p - 1)}
								className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
								⬅ Prev
							</button>
							<span className="text-sm text-gray-600">
								Page {page} of {totalPages}
							</span>
							<button
								disabled={page === totalPages}
								onClick={() => setPage((p) => p + 1)}
								className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
								Next ➡
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Tasks;
