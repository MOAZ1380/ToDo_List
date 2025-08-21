const factory = require('./handlersFactory')
const Task = require('../models/TasksModel');


// Middleware to add list_id to Task
exports.AddListId = (req, res, next) => {
    if (!req.body.list_id) {
        req.body.list_id = req.params.listId;
    }
    next();
}

// @desc    create Task
// @route   GET /api/task
// @access  private/User
exports.createTask = factory.CreateOne(Task);


// @desc    create Task
// @route   GET /api/task
// @access  private/User
exports.getTasks = factory.getAll(Task);


// @desc    create Task
// @route   GET /api/task/:id
// @access  private/User
exports.getTaskById = factory.getOne(Task);


// @desc    create Task
// @route   GET /api/task/:id
// @access  private/User
exports.updateTask = factory.UpdateOne(Task);


// @desc    create Task
// @route   GET /api/task/:id
// @access  private/User
exports.DeleteTask = factory.DeleteOne(Task);
