const factory = require('./handlersFactory');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');


exports.hashPass = async (req, res, next) => {
    if (!req.body.password) return next();
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    next();
}

// @desc    create User
// @route   GET /api/user
// @access  private/Admin
exports.CreateUser = factory.CreateOne(User);

// @desc    Get All Users
// @route   GET /api/user
// @access  private/Admin
exports.getUsers = factory.getAll(User);

// @desc    get specific User by id
// @route   GET /api/user/:id
// @access  private/Admin
exports.getUser = factory.getOne(User);

// @desc    Update User
// @route   GET /api/user/:id
// @access  private/Admin
exports.UpdateUser = factory.UpdateOne(User);


// @desc    Delete User
// @route   GET /api/user/:id
// @access  private/Admin
exports.DeleteUser = factory.DeleteOne(User);




