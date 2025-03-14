const express = require('express');
const router = express.Router();
const { 
    CreateUser,
    getUser,
    getUsers,
    UpdateUser,
    DeleteUser
     } = require('../services/UserServices');

const {
    allowedTo,
    } = require('../services/authService');

const  SetSingleImage  = require('../middleware/Setsingleimage');
const  verifyToken  = require('../middleware/verifyToken');

router.route('/')
    .post(verifyToken, allowedTo, SetSingleImage, CreateUser)
    .get(verifyToken, allowedTo, getUsers)

router.route('/:id')
    .get(verifyToken, allowedTo, getUser)
    .put(verifyToken, allowedTo, SetSingleImage, UpdateUser)
    .delete(verifyToken, allowedTo, DeleteUser)

module.exports = router;
