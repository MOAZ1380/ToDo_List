import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompletedTasks, update } from "../services/tasksAPi";

const Completed = () => {
	const { listId } = useParams();
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCompletedTasks = async () => {
			try {
				setLoading(true);
				const res = await getCompletedTasks(listId, {
					page: 1,
					limit: 10,
					sort: "-created_at",
				});
				setTasks(res.data.data || []);
			} catch {
				setError("Failed to fetch completed tasks");
			} finally {
				setLoading(false);
			}
		};
		fetchCompletedTasks();
	}, [listId]);

	const handleUndo = async (id) => {
		try {
			const res = await update(listId, id, {
				completed: false,
				status: "Pending",
			});
			if (res.data?.status === "success") {
				setTasks((prev) => prev.filter((t) => t._id !== id));
			}
		} catch {
			setError("⚠️ Failed to undo task.");
		}
	};

	if (loading) return <p>Loading completed tasks...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-green-600">
						✅ Completed Tasks
					</h2>
					<div className="space-x-3">
						<button
							onClick={() => navigate(`/lists/${listId}/uncompleted`)}
							className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">
							⬅ Back to Tasks
						</button>

						<button
							onClick={() => navigate(`/lists`)}
							className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow">
							📋 Back to Lists
						</button>
					</div>
				</div>

				{tasks.length === 0 ? (
					<p className="text-gray-500 text-center">
						🚫 No completed tasks yet.
					</p>
				) : (
					<ul className="space-y-3">
						{tasks.map((task) => (
							<li
								key={task._id}
								className="bg-white p-4 rounded-xl shadow flex justify-between items-center border-l-4 border-green-500 hover:shadow-lg transition">
								<div>
									<p className="line-through text-gray-500">
										{task.description}
									</p>
									<span className="text-xs text-gray-400">✔ Completed</span>
								</div>
								<button
									onClick={() => handleUndo(task._id)}
									className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow">
									↩ Undo
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Completed;
