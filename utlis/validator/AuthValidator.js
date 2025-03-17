const { body, check } = require('express-validator');
const User = require('../../models/UserModel');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const ApiError = require('../ApiError');

exports.signUpValidator = [
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
        .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 to 50 characters'),

    validatorMiddleware
];


exports.ResetPasswordValidator = [        
    body('renewpassword')
        .notEmpty().withMessage('Confirm Password is required')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 to 50 characters')
        .custom((value, { req }) => {
            if (value !== req.body.newpassword) {
                throw new ApiError(400, 'Passwords do not match');
            }
            return true;
        }),
    validatorMiddleware
];
