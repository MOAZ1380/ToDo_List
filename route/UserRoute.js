const express = require('express');
const router = express.Router();
const { 
    CreateUser,
    getUser,
    getUsers,
    UpdateUser,
    DeleteUser,
    hashPass
} = require('../services/UserServices');

const {
    CreateUserValidator,
    UpdateUserValidator,
    DeleteUserValidator,
    GetUserValidator,
} = require('../utlis/validator/UserValidator');

const {
    allowedTo,
} = require('../services/authService');

const  SetSingleImage  = require('../middleware/Setsingleimage');
const  verifyToken  = require('../middleware/verifyToken');

router.route('/')
    .post(verifyToken, CreateUserValidator, allowedTo, SetSingleImage, hashPass, CreateUser)
    .get(verifyToken, allowedTo, getUsers)

router.route('/:id')
    .get(verifyToken, GetUserValidator, allowedTo, getUser)
    .put(verifyToken, UpdateUserValidator, allowedTo, SetSingleImage, hashPass, UpdateUser)
    .delete(verifyToken, DeleteUserValidator, allowedTo, DeleteUser)

module.exports = router;
