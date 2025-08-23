import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findAll, create, deleteList, updateList } from "../services/listApi";

const Lists = () => {
	const [lists, setLists] = useState([]);
	const [newTitle, setNewTitle] = useState("");
	const [search, setSearch] = useState("");
	const [sortOrder, setSortOrder] = useState("-createdAt");
	const [error, setError] = useState(null);

	const [page, setPage] = useState(1);
	const [limit] = useState(5);
	const [total, setTotal] = useState(0);

	const [selectedListId, setSelectedListId] = useState(null);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updateTitle, setUpdateTitle] = useState("");
	const [modalError, setModalError] = useState(null);

	// 🟢 fetch lists
	useEffect(() => {
		const fetchLists = async () => {
			try {
				const response = await findAll({
					page,
					limit,
					sort: sortOrder,
					search: search || undefined,
					fields: "title,tasks,createdAt",
				});
				if (response.data?.status === "success") {
					setLists(Array.isArray(response.data.data) ? response.data.data : []);
					setTotal(response.data.total || response.data.results || 0);
				}
			} catch {
				setError("Failed to fetch lists. Please try again.");
			}
		};
		fetchLists();
	}, [search, sortOrder, page, limit]);

	// 🟢 add list
	const handleAddList = async (e) => {
		e.preventDefault();
		if (!newTitle.trim()) return;

		try {
			const response = await create({ title: newTitle });
			if (response.data?.status === "success") {
				setPage(1);
				setNewTitle("");
				setLists((prev) => [response.data.data, ...prev]);
			}
		} catch {
			setError("Title must be at least 5 characters and must be unique");
		}
	};

	// 🟢 delete list
	const handleDelete = async (id) => {
		try {
			const response = await deleteList(id);
			if (response.data?.status === "success") {
				setLists(lists.filter((list) => list._id !== id));
				if (selectedListId === id) setSelectedListId(null);
			}
		} catch {
			if (isModalOpen) {
				setModalError("Failed to delete list. Please try again.");
			} else {
				setError("Failed to delete list. Please try again.");
			}
		}
	};

	// 🟢 open update modal
	const openUpdateModal = (id) => {
		const selectedList = lists.find((l) => l._id === id);
		if (!selectedList) return;
		setSelectedListId(id);
		setUpdateTitle(selectedList.title);
		setModalError(null);
		setIsModalOpen(true);
	};

	// 🟢 update
	const handleUpdate = async () => {
		if (!updateTitle.trim()) return;
		try {
			const response = await updateList(selectedListId, { title: updateTitle });
			if (response.data?.status === "success") {
				setLists(
					lists.map((list) =>
						list._id === selectedListId
							? { ...list, title: response.data.data.title }
							: list,
					),
				);
				setIsModalOpen(false);
			}
		} catch {
			setModalError(
				"Failed to update list. Please ensure the title is unique and at least 5 characters long.",
			);
		}
	};

	const totalPages = Math.ceil(total / limit);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-12 px-6">
			<div className="max-w-5xl mx-auto space-y-10">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
					<h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
						Your Lists
					</h1>
					<p className="text-gray-500 font-medium">
						Total Lists:{" "}
						<span className="text-indigo-700 font-semibold">{total}</span>
					</p>
				</div>

				{/* Error */}
				{error && (
					<div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm shadow-sm">
						{error}
					</div>
				)}

				{/* Controls */}
				<div className="flex flex-col md:flex-row md:items-center gap-4">
					<input
						type="text"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1);
						}}
						placeholder="🔍 Search lists..."
						className="flex-1 border border-gray-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
					/>

					<select
						value={sortOrder}
						onChange={(e) => {
							setSortOrder(e.target.value);
							setPage(1);
						}}
						className="border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition">
						<option value="-createdAt">Newest First</option>
						<option value="createdAt">Oldest First</option>
					</select>

					<form
						onSubmit={handleAddList}
						className="flex items-center bg-white rounded-xl shadow-md px-3 py-2 border border-gray-200 w-full md:w-auto">
						<input
							type="text"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							placeholder="✏️ Enter new list title..."
							className="flex-1 outline-none p-2 text-gray-700 rounded-lg"
							required
						/>
						<button
							type="submit"
							className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-2 transition shadow-sm">
							Add
						</button>
					</form>
				</div>

				{/* Lists */}
				{lists.length === 0 && page === 1 ? (
					<p className="text-center text-gray-500 text-lg">No lists found 🚫</p>
				) : (
					<div className="grid md:grid-cols-2 gap-6">
						{lists.map((list) => (
							<Link
								to={`/lists/${list._id}/tasks`}
								key={list._id}
								className="block">
								<div
									className={`cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition transform p-6 border ${
										selectedListId === list._id
											? "border-indigo-500 ring-2 ring-indigo-300"
											: "border-gray-100"
									}`}>
									<div className="flex justify-between items-start">
										<div>
											<h2 className="text-xl font-bold text-indigo-600 mb-1">
												{list.title}
											</h2>
											<p className="text-gray-500 text-sm">
												Tasks:{" "}
												<span className="font-semibold text-gray-800">
													{list.tasks?.length || 0}
												</span>
											</p>
										</div>
										<div className="text-gray-400 text-xs text-right">
											<p>{new Date(list.createdAt).toLocaleDateString()}</p>
											<p>{new Date(list.createdAt).toLocaleTimeString()}</p>
										</div>
									</div>

									{/* Buttons */}
									<div className="flex gap-3 mt-4">
										<button
											onClick={(e) => {
												e.preventDefault(); // ⬅️ مهم علشان يمنع الـ Link
												e.stopPropagation();
												openUpdateModal(list._id);
											}}
											className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm shadow">
											✏ Update
										</button>
										<button
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												handleDelete(list._id);
											}}
											className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm shadow">
											🗑 Delete
										</button>
									</div>

									{selectedListId === list._id && (
										<p className="mt-2 text-xs text-indigo-600 font-medium">
											✔ Selected
										</p>
									)}
								</div>
							</Link>
						))}
					</div>
				)}

				{/* Pagination */}
				<div className="flex justify-center items-center gap-4">
					<button
						disabled={page === 1}
						onClick={() => setPage((p) => p - 1)}
						className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition">
						← Previous
					</button>
					<span className="text-gray-600 font-medium">
						Page <span className="text-indigo-600">{page}</span> of {totalPages}
					</span>
					<button
						disabled={page === totalPages}
						onClick={() => setPage((p) => p + 1)}
						className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition">
						Next →
					</button>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
						<h2 className="text-xl font-semibold text-indigo-600 mb-4">
							Update List Title
						</h2>

						{modalError && (
							<div className="bg-red-100 border border-red-300 text-red-600 px-3 py-2 rounded-lg text-sm mb-3">
								{modalError}
							</div>
						)}

						<input
							type="text"
							value={updateTitle}
							onChange={(e) => setUpdateTitle(e.target.value)}
							className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
							placeholder="Enter new title..."
						/>
						<div className="flex justify-end gap-3 mt-5">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
								Cancel
							</button>
							<button
								onClick={handleUpdate}
								className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition">
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Lists;
