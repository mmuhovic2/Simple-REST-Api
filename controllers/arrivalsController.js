const mongoose  = require('mongoose');
const Arrival = require('../models/timeArrivalModel');

module.exports.getArrivals = async (req,res,next) =>{
    try{
      const arrivals = await Arrival.find({}).populate('user').exec();
      res.status(200).json(arrivals);
    } catch (err){
      next(err);
    }
}

module.exports.createArrival = async (req,res,next) =>{
    if(!req.body.time || !req.body.user){
        res.status(400).send();
    } else{
        try{
            const newArrival = new Arrival({
                _id: new mongoose.Types.ObjectId(),
                time: req.body.time,
                user: req.body.user,
            })
            await newArrival.save();
            res.status(201).json(newArrival);
        } catch (err){
            next(err);
        }
    } 
}

module.exports.updateArrivalById = async (req,res,next) =>{
    try{
        const arrival = await Arrival.findById(req.params.id).exec();

        if(arrival){
            Arrival.updateOne(
                {_id:req.params.id},
                {$set:{
                    time:req.body.time,
                    user:req.body.user,
                }}
            ).exec()
            res.status(200).send();
        }else{
            res.status(404).send();
        }
    } catch (err){
            next(err);
    }
}

module.exports.deleteArrivalById = async (req,res,next) =>{
    try{
        const arrival = await Arrival.findById(req.params.id).exec();

        if(arrival){
            await Arrival.findByIdAndDelete(req.params.id).exec();
            res.status(200).send();
        }else{
            res.status(404).send();
        }
    } catch (err){
            next(err);
    }
}
