const { prisma } = require('../config/db');


// Get All Tasks
exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json({
    success: true,
    data: tasks
  })
}

exports.getTask = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`
    })
  }

  res.json({
    success: true,
    data: task
  })
}

exports.createTask = async (req, res) => {
  const { title, description } = req.body
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    })
  }
  const task = await prisma.task.create({
    data: {
      title,
      description
    }
  })
  res.status(201).json({
    success: true,
    data: task
  })
}

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${id} not found`
    })
  }
  const { title, description, completed } = req.body
  const newTask = await prisma.task.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title,
      description,
      completed
    }
  })
  res.json({
    success: true,
    data: newTask
  })
}


// Delete_Task
exports.Delete_Task = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with id ${id} not found`
    })
  }
  
  await prisma.task.delete({
    where: { id: parseInt(id) }
  });

  res.json({
    success: true,
    message: `Task with id ${id} deleted`
  });
    
};

