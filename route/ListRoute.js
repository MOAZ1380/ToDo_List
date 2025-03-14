const express = require('express');
const verifyToken = require('../middleware/verifyToken');

// const TaskRoute = require('./TaskRoute');

const { 
    createList,
    getList,
    getLists,
    DeleteList,
    UpdateList
    } = require('../services/ListServices')

const router = express.Router();

// router.use('/:listId/task', TaskRoute);



router.route('/')
    .post(verifyToken, createList)
    .get(verifyToken, getLists);

router.route('/:id')
    .get(verifyToken, getList)
    .put(verifyToken, UpdateList)
    .delete(verifyToken, DeleteList)

module.exports = router;