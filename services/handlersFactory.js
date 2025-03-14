const asyncHandler = require('express-async-handler');
const ApiError = require('../utlis/ApiError');


exports.CreateOne = (Model) => asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ status: 'success', data: doc });
});


exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
        return next(new ApiError(404, `${Model} not found`));
    }
    res.status(200).json({ status: "success", data: doc });
});


exports.getAll = (Model) => asyncHandler(async (req, res) => {
    const doc = await Model.find()
    res.status(200).json({ status: "success", results: doc.length, data: doc })
});


exports.UpdateOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const doc = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!doc) {
        return next(new ApiError(404, `${Model} not found`));
    }
    res.status(200).json({ status: "success", data: doc });
});


exports.DeleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
        return next(new ApiError(404, `${Model} not found`));
    }
    res.status(200).json({ status: "delete success", data: doc });
});