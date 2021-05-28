const mongoose  = require('mongoose');
const User = require('../models/usersModel');

module.exports.getUsers = async (req,res,next) =>{
    try{
      const users = await User.find({}).exec();
      res.status(200).json(users);
    } catch (err){
      next(err);
    }
}

module.exports.createUser = async (req,res,next) =>{
    if(!req.body.name){
        res.status(400).send();
    } else{
        try{
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
            })
            await newUser.save();
            res.status(201).json(newUser);
        } catch (err){
            next(err);
        }
    } 
}

module.exports.updateUserById = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.id).exec();
        console.log(user)
        if(user){
            User.updateMany(
                { _id : req.params.id},
                {$set:{name:req.body.name}
                }
            ).exec()
            res.status(200).send();
        }else{
            res.status(404).send();
        }
    } catch (err){
            next(err);
    }
}

module.exports.deleteUserById = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.id).exec();

        if(user){
            await User.deleteOne({_id:req.params.id}).exec();
            res.status(200).send();
        }else{
            res.status(404).send();
        }
    } catch (err){
            next(err);
    }
}