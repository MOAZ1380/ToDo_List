const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const TaskRoute = require('./TaskRoute');

const { 
    createList,
    getList,
    getLists,
    DeleteList,
    UpdateList,
    AddUser_Id
    } = require('../services/ListServices')

const { 
    CreateListValidator,
    UpdateListValidator,
    GetListValidator,
    DeleteListValidator,
 } = require('../utlis/validator/ListsValidator');

const router = express.Router();

router.use('/:listId/task', TaskRoute);



router.route('/')
    .post(verifyToken, CreateListValidator,  AddUser_Id, createList)
    .get(verifyToken, getLists);

router.route('/:id')
    .get(verifyToken, GetListValidator, getList)
    .put(verifyToken, UpdateListValidator, UpdateList)
    .delete(verifyToken, DeleteListValidator, DeleteList)

module.exports = router;