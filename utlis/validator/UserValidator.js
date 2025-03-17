const { body, check } = require('express-validator');
const User = require('../../models/UserModel');
const List = require('../../models/ListsModel');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const ApiError = require('../ApiError');


exports.CreateUserValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 to 50 characters'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new ApiError(400, 'Email is already in use');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 3, max: 50 }).withMessage('Password must be between 3 to 50 characters'),

    body('list_id')
        .optional()
        .isArray().withMessage('list_id must be an array')
        .custom(async (listIds) => {
            for (const id of listIds) {
                const list = await List.findById(id);
                if (!list) {
                    throw new ApiError(404, `List with ID ${id} not found`);
                }
            }
            return true;
        }),

    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),

    body('isVerified')
        .optional()
        .isBoolean().withMessage('isVerified must be a boolean'),

    body('avatar')
        .optional()
        .isURL().withMessage('Avatar must be a valid URL'),

    validatorMiddleware
];

exports.UpdateUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid user ID format')
        .custom(async (id) => {
            const user = await User.findById(id);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            return true;
        }),

    body('name')
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 to 50 characters'),

    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                throw new ApiError(400, 'Email is already in use');
            }
            return true;
        }),

    body('password')
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage('Password must be between 3 to 50 characters'),

    body('list_id')
        .optional()
        .isArray().withMessage('list_id must be an array')
        .custom(async (listIds) => {
            for (const id of listIds) {
                const list = await List.findById(id);
                if (!list) {
                    throw new ApiError(404, `List with ID ${id} not found`);
                }
            }
            return true;
        }),

    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),

    body('isVerified')
        .optional()
        .isBoolean().withMessage('isVerified must be a boolean'),

    body('avatar')
        .optional()
        .isURL().withMessage('Avatar must be a valid URL'),

    validatorMiddleware
];

exports.DeleteUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid user ID format')
        .custom(async (id) => {
            const user = await User.findById(id);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            return true;
        }),

    validatorMiddleware
];

exports.GetUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid user ID format')
        .custom(async (id) => {
            const user = await User.findById(id);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            return true;
        }
    ),
];

