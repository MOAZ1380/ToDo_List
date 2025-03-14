const Task = require('../models/TasksModel');
const ApiError = require('../utlis/ApiError');
const AsyncHandler = require('express-async-handler');
const List = require('../models/ListsModel')




exports.createTask = AsyncHandler(
    async (req, res) => {
        if (!req.body.list_id) {
            req.body.list_id = req.params.listId;
        }
        const newTask = await Task.create(req.body);

        await List.findByIdAndUpdate(req.body.list_id, {
            $push: { tasks: newTask._id }
        })
        res.status(201).json({ status: "success", data: newTask });
});




exports.getTasks = AsyncHandler(
    async (req, res, next) => {
        mylist = {}
        if ( req.params.listId ) mylist = { list_id: req.params.listId } 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : 'createdAt';
        const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '-__v';
        
        const tasks = await Task.find({ list_id: req.params.listId })
        .skip(skip)
        .limit(limit)
        .sort(sortBy)
        .select(fields);

        res.status(200).json({ status: "success", results: tasks.length, data: tasks });
});




exports.getTaskById = AsyncHandler(
    async (req, res, next) => {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return next(new ApiError(404, 'Task not found'));
        }
        res.status(200).json({ status: "success", data: task });
});




exports.updateTask = AsyncHandler(
    async(req, res, next) => {
        const { id } = req.params
        const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!req.body.list_id) {
            req.body.list_id = req.params.listId;
        }

        if (!updateTask) {
            return next(new ApiError(404, 'Task not found'));
        }
        res.status(200).json({ status: "success", data: updateTask });
});




exports.DeleteTask = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
        return next(new ApiError(404, 'Task not found'));
    }

    await List.findByIdAndUpdate(deleteTask.list_id, {
        $pull: { tasks: id }
    });

    res.status(200).json({ status: "success", message: "Task deleted successfully" });
});
