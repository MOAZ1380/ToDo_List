require("dotenv").config()
const express = require('express');
const { connectDB } = require('./config/db');
const taskRoutes = require('./routes/tasksRoutes');

const app = express();

// Middleware
app.use(express.json())

connectDB();

// Routes
// app.use('/api', (req, res) => {
//   res.send('Hello World')
// })

app.use('/api/tasks', taskRoutes)

const prot = process.env.PORT || 5001
app.listen(prot, () =>
  console.log(`🚀 Server running on port ${prot}`)
)