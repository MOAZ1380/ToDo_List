const { body, check } = require("express-validator");
const List = require("../../models/ListsModel");
const Task = require("../../models/TasksModel");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const ApiError = require("../ApiError");

exports.CreateTaskValidator = [
	body("description")
		.trim()
		.notEmpty()
		.withMessage("Description is required")
		.isLength({ min: 5, max: 200 })
		.withMessage("Description must be between 3 to 200 characters"),

	body("list_id")
		.notEmpty()
		.withMessage("List ID is required")
		.isMongoId()
		.withMessage("List ID must be a valid Mongo ID")
		.custom(async (value, { req }) => {
			const list = await List.findById(value);
			if (!list) {
				throw new ApiError(404, "List not found");
			}
			return true;
		}),

	validatorMiddleware,
];

exports.UpdateTaskValidator = [
	check("id")
		.notEmpty()
		.withMessage("Task ID is required")
		.isMongoId()
		.withMessage("Task ID must be a valid Mongo ID")
		.custom(async (value, { req }) => {
			const task = await Task.findById(value);
			if (!task) {
				throw new ApiError(404, "Task not found");
			}
			return true;
		}),

	body("description")
		.optional()
		.trim()
		.isLength({ min: 5, max: 200 })
		.withMessage("Description must be between 3 to 200 characters"),

	body("list_id")
		.optional()
		.isMongoId()
		.withMessage("List ID must be a valid Mongo ID")
		.custom(async (value, { req }) => {
			const list = await List.findById(value);
			if (!list) {
				throw new ApiError(404, "List not found");
			}
			return true;
		}),

	validatorMiddleware,
];

exports.GetTaskValidator = [
	check("id")
		.notEmpty()
		.withMessage("List ID is required")
		.isMongoId()
		.withMessage("List ID must be a valid Mongo ID")
		.custom(async (value, { req }) => {
			const list = await List.findById(value);
			if (!list) {
				throw new ApiError(404, "List not found");
			}
			return true;
		}),

	validatorMiddleware,
];

exports.DeleteTaskValidator = [
	check("listId")
		.notEmpty()
		.withMessage("List ID is required")
		.isMongoId()
		.withMessage("List ID must be a valid Mongo ID")
		.custom(async (value, { req }) => {
			const list = await List.findById(value);
			if (!list) {
				throw new ApiError(404, "List not found");
			}
			return true;
		}),

	validatorMiddleware,
];
