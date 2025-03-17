const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
        minlength: [3, 'Title cannot be less than 3 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    },
    priority: {
        type: String,
        default: 'Low',
        enum: ['Low', 'Medium', 'High']
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In Progress', 'Completed']
    },
    list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
}, { timestamps: true });

// Add list_id to Task
TaskSchema.pre('save', async function (next) {
    const list = await this.model('List').findByIdAndUpdate(this.list_id, {
        $push: { tasks: this._id }
    })
    next();
});

// remove task from list
TaskSchema.pre('remove', async function (next) {
    await this.model('List').findByIdAndUpdate(this.list_id, {
        $pull: { tasks: this._id }
    })
    next();
});


module.exports = mongoose.model('Task', TaskSchema);