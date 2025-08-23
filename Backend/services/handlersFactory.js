const asyncHandler = require("express-async-handler");
const ApiError = require("../utlis/ApiError");

exports.CreateOne = (Model) =>
	asyncHandler(async (req, res) => {
		const doc = await Model.create(req.body);
		res.status(201).json({ status: "success", data: doc });
	});

exports.getOne = (Model) =>
	asyncHandler(async (req, res, next) => {
		const doc = await Model.findById(req.params.id);
		if (!doc) {
			return next(new ApiError(404, `${Model.modelName}  not found`));
		}
		res.status(200).json({ status: "success", data: doc });
	});

exports.getAll = (Model) =>
	asyncHandler(async (req, res) => {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * limit;

		const sortBy = req.query.sort
			? req.query.sort.split(",").join(" ")
			: "createdAt";
		const fields = req.query.fields
			? req.query.fields.split(",").join(" ")
			: "-__v";

		const doc = await Model.find()
			.skip(skip)
			.limit(limit)
			.sort(sortBy)
			.select(fields);

		res.status(200).json({ status: "success", results: doc.length, data: doc });
	});

exports.UpdateOne = (Model) =>
	asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const doc = await Model.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!doc) {
			return next(new ApiError(404, `${Model.modelName}  not found`));
		}
		res.status(200).json({ status: "success", data: doc });
	});

exports.DeleteOne = (Model) =>
	asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const doc = await Model.findByIdAndDelete(id);
		if (!doc) {
			return next(new ApiError(404, `${Model.modelName} not found`));
		}
		res.status(200).json({ status: "delete success", data: doc });
	});
