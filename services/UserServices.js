const factory = require('./handlersFactory');
const User = require('../models/UserModel');


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




