const mongoose = require('mongoose')
const Arrival = require('./timeArrivalModel')

const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required: true
    }
});

usersSchema.pre('deleteOne', function(next) {
    Arrival.deleteMany({user: this._conditions._id}).exec();
    next();
});

const usersModel= mongoose.model('users',usersSchema);

module.exports = usersModel;