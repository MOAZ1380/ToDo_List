const mongoose = require('mongoose');


const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [50, 'Title cannot be more than 50 characters'],
        minlength: [3, 'Title cannot be less than 3 characters']
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }
}, { timestamps: true });




module.exports = mongoose.model('List', ListSchema);