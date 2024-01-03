const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, maxlength:30},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true, minlength:8, maxlength:1024}

},{
    timestamps: true,
}    
);

// an index for the username field for efficient searching
userSchema.index({ username: 'text' });

module.exports =  mongoose.model('User',userSchema);
