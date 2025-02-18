const express = require('express');
const { getTasks, getTask, createTask, updateTask, Delete_Task } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask)
router.patch('/:id', updateTask)
router.delete('/:id', Delete_Task)


module.exports = router;