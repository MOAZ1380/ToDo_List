const ApiError = require('../utlis/ApiError');
const AsyncHandler = require('express-async-handler');
const factory = require('./handlersFactory');

const User = require('../models/UserModel');
const List = require('../models/ListsModel');
const Task = require('../models/TasksModel');


exports.AddUser_Id = (req, res, next) => {
    if (!req.body.User_id) {
        req.body.User_id = req.user._id;
    }
    next();
}

// @desc    create List
// @route   GET /api/list
// @access  private/User
exports.createList = factory.CreateOne(List);


// @desc    Get Lists
// @route   GET /api/list
// @access  private/User
exports.getLists = AsyncHandler(
    async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : 'createdAt';
        const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '-__v';
        
        const lists = await List.find({ User_id: req.user._id })
        .skip(skip)
        .limit(limit)
        .sort(sortBy)
        .select(fields)

        res.status(200).json({ status: "success", results: lists.length, data: lists })
});


// @desc    Get specific List
// @route   GET /api/list/:id
// @access  private/User
exports.getList = factory.getOne(List);

// @desc    Update specific List
// @route   GET /api/list/:id
// @access  private/User
exports.UpdateList = factory.UpdateOne(List);


// @desc    Delete specific List
// @route   GET /api/list/:id
// @access  private/User
exports.DeleteList = AsyncHandler(async (req, res, next) => {
    console.log("req.user:", req.user);
    if (!req.user) {
        return next(new ApiError(401, 'User not authenticated'));
    }
    
    const { id } = req.params;
    const deleteList = await List.findOneAndDelete({ _id: id });

    if (!deleteList) {
        return next(new ApiError(404, 'List not found'));
    }

    await Task.deleteMany({ list_id: id });

    await User.findByIdAndUpdate(req.user._id, { $pull: { list_id: id } });

    res.status(200).json({ status: "success", message: "List and its tasks deleted successfully" });
});


