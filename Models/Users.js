const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    usernm :{ type:String,require:true,unique:true },
    email:{type:String,require:true,unique:true},
    password: { type: String},
    role: { type: String, enum: ['user', 'repairshop']},
    token: { type: String }
});

module.exports = mongoose.model('User',UserSchema);