const mongoose = require('mongoose')

const timeArrivalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time:{
        type:String,
        required: true
    },
    user:{type: mongoose.Schema.Types.ObjectId,ref:'users'}
});

const timeArrivalModel= mongoose.model('arrivals',timeArrivalSchema);

module.exports = timeArrivalModel;