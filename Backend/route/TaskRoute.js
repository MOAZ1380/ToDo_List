const express = require("express");
const VerifyToken = require("../middleware/verifyToken");
const {
	createTask,
	getTaskById,
	updateTask,
	DeleteTask,
	AddListId,
	getUncompletedTasks,
	getCompletedTasks,
} = require("../services/TaskServices");

const {
	CreateTaskValidator,
	UpdateTaskValidator,
	GetTaskValidator,
	DeleteTaskValidator,
} = require("../utlis/validator/TasksValidator");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.post(VerifyToken, AddListId, CreateTaskValidator, createTask)
	.get(VerifyToken, getUncompletedTasks);

router.route("/completed").get(VerifyToken, getCompletedTasks);

router
	.route("/:id")
	.get(VerifyToken, GetTaskValidator, getTaskById)
	.put(VerifyToken, AddListId, UpdateTaskValidator, updateTask)
	.delete(VerifyToken, DeleteTaskValidator, DeleteTask);

module.exports = router;
