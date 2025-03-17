const express = require('express');
const VerifyToken = require('../middleware/verifyToken')
const { createTask,
        getTasks,
        getTaskById,
        updateTask,
        DeleteTask,
        AddListId
    } = require('../services/TaskServices')

const { CreateTaskValidator,
    UpdateTaskValidator,
    GetTaskValidator,
    DeleteTaskValidator,
 } = require('../utlis/validator/TasksValidator');


const router = express.Router({ mergeParams: true });

router.route('/')
    .post(VerifyToken, AddListId, CreateTaskValidator, createTask)
    .get(VerifyToken, getTasks);

router.route('/:id')
    .get(VerifyToken, GetTaskValidator, getTaskById)
    .put(VerifyToken, AddListId, UpdateTaskValidator, updateTask)
    .delete(VerifyToken, DeleteTaskValidator, DeleteTask)

module.exports = router;