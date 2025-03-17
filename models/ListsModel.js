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
        ref: 'User',
        required: true
    }
}, { timestamps: true });


// when a list is created, the list_id is added to the user's list_id array
ListSchema.pre('save', async function (next) {
    try {
        await this.model('User').findByIdAndUpdate(this.User_id, { $push: { list_id: this._id } });
        next();
    } catch (err) {
        next(err);
    }
});

// populate the tasks field when a list is found
ListSchema.pre('find', function (next) {
    this.populate('tasks');
    next();
});

// populate the tasks field when a list is found
ListSchema.pre('findOne', function (next) {
    this.populate('tasks');
    next();
});


module.exports = mongoose.model('List', ListSchema);