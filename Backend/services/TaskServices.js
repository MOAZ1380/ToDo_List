const factory = require("./handlersFactory");
const Task = require("../models/TasksModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utlis/ApiError");
// Middleware to add list_id to Task
exports.AddListId = (req, res, next) => {
	if (!req.body.list_id) {
		req.body.list_id = req.params.listId;
	}
	next();
};

// @desc    create Task
// @route   GET /api/task
// @access  private/User
exports.createTask = factory.CreateOne(Task);

// @desc    Get uncompleted tasks
// @route   GET /api/task
// @access  private/User
exports.getUncompletedTasks = asyncHandler(async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * limit;
		const search = req.query.search || "";
		const query = { completed: false };

		if (search) {
			query.description = { $regex: search, $options: "i" };
		}

		const fields = req.query.fields
			? req.query.fields.split(",").join(" ")
			: "-__v";

		const priorityOrder = { High: 1, Medium: 2, Low: 3 };

		const totalCount = await Task.countDocuments(query); // ← تأكد انها Task مش Model

		let doc = await Task.find(query).skip(skip).limit(limit).select(fields);

		doc = doc.sort((a, b) => {
			const pa = priorityOrder[a.priority] || 99;
			const pb = priorityOrder[b.priority] || 99;
			return pa - pb;
		});

		const totalPages = Math.ceil(totalCount / limit);

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: doc,
			meta: { page, limit, totalPages, totalCount },
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// @desc    create Task
// @route   GET /api/task/:id
// @access  private/User
exports.getTaskById = factory.getOne(Task);

// @desc    Get uncompleted tasks
// @route   GET /api/task/completed
// @access  private/User
exports.getCompletedTasks = asyncHandler(async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * limit;
		const search = req.query.search || "";
		const query = { completed: true };

		if (search) {
			query.description = { $regex: search, $options: "i" };
		}

		const fields = req.query.fields
			? req.query.fields.split(",").join(" ")
			: "-__v";

		const priorityOrder = { High: 1, Medium: 2, Low: 3 };

		const totalCount = await Task.countDocuments(query);

		let doc = await Task.find({
			...query,
			list_id: req.params.listId,
		})
			.skip(skip)
			.limit(limit)
			.select(fields);

		doc = doc.sort((a, b) => {
			const pa = priorityOrder[a.priority] || 99;
			const pb = priorityOrder[b.priority] || 99;
			return pa - pb;
		});

		const totalPages = Math.ceil(totalCount / limit);

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: doc,
			meta: { page, limit, totalPages, totalCount },
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// @desc    create Task
// @route   GET /api/task/:id
// @access  private/User
exports.updateTask = factory.UpdateOne(Task);

// @desc    create Task
// @route   GET /api/task/:id
// @access  private/User
exports.DeleteTask = factory.DeleteOne(Task);
