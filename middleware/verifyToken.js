const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utlis/ApiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'You are not logged in. Please log in to access this route.'));
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return next(new ApiError(401, 'Invalid authorization token.'));
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new ApiError(401, 'Invalid or expired token.'));
    }

    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
        return next(new ApiError(401, 'The user associated with this token no longer exists.'));
    }

    if (user.passwordChangedAt) {
        const passChangedTimestamp = Math.floor(user.passwordChangedAt.getTime() / 1000);
        if (passChangedTimestamp > decodedToken.iat) {
            return next(new ApiError(401, 'User recently changed password. Please log in again.'));
        }
    }

    req.user = user;
    next();
});

module.exports = verifyToken;
