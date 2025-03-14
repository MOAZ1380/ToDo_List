const ApiError = require('../utlis/ApiError');
const AsyncHandler = require('express-async-handler');

const User = require('../models/UserModel');
const List = require('../models/ListsModel');



exports.createList = AsyncHandler(
    async (req, res) => {
        req.body.User_id = req.user._id;
        const newList = await List.create(req.body);
        const user = await User.findById(req.user._id);
        
        user.list_id.push(newList._id);
        await user.save();
        res.status(201).json({ status: "success", data: newList });
});



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



exports.getList = AsyncHandler(
    async (req, res, next) => {
        const list = await List.findById(req.params.id);
        if (!list) {
            return next(new ApiError(404, 'list not found'));
        }
        res.status(200).json({ status: "success", data: list});
});



exports.UpdateList = AsyncHandler(
    async(req, res, next) => {
        const { id } = req.params
        const updateList = await List.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updateList) {
            return next(new ApiError(404, 'list not found'));
        }
        res.status(200).json({ status: "success", data: updateList });
});




exports.DeleteList = AsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deleteList = await List.findByIdAndDelete(id);
    if (!deleteList) {
        return next(new ApiError(404, 'List not found'));
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }
    user.list_id = user.list_id.filter(list => list.toString() !== id);
    await user.save();

    res.status(200).json({ status: "success", message: "List and its tasks deleted successfully" });
});