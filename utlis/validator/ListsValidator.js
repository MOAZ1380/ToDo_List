const { body, check } = require('express-validator');
const List = require('../../models/ListsModel');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const ApiError = require('../ApiError');

exports.CreateListValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('title is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('title must be between 5 to 200 characters'),

    validatorMiddleware
];

exports.UpdateListValidator = [
    check('id')
        .notEmpty()
        .withMessage('list ID is required')
        .isMongoId()
        .withMessage('list ID must be a valid Mongo ID')
        .custom(async (value, { req }) => {
            const list = await List.findById(value);
            if (!list) {
                throw new ApiError(404, 'List not found');
            }
            return true;
        }),

    body('title')
        .trim()
        .notEmpty()
        .withMessage('title is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('title must be between 5 to 200 characters'),


    validatorMiddleware
];

exports.GetListValidator = [
    check('id')
        .notEmpty()
        .withMessage('List ID is required')
        .isMongoId()
        .withMessage('List ID must be a valid Mongo ID')
        .custom(async (value, { req }) => {
            const list = await List.findById(value);
            if (!list) {
                throw new ApiError(404, 'List not found');
            }
            return true;
        }),

    validatorMiddleware
]

exports.DeleteListValidator = [
    check('id')
        .notEmpty()
        .withMessage('List ID is required')
        .isMongoId()
        .withMessage('List ID must be a valid Mongo ID')
        .custom(async (value, { req }) => {
            const list = await List.findById(value);
            if (!list) {
                throw new ApiError(404, 'List not found');
            }
            return true;
        }),

    validatorMiddleware
]



