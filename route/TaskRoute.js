const express = require('express');
const router = express.Router({ mergeParams: true });
const { createTask,
        getTasks,
        getTaskById,
        updateTask,
        DeleteTask
    } = require('../services/TaskServices')




router.route('/')
    .post(createTask)
    .get(getTasks);

router.route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(DeleteTask)

module.exports = router;