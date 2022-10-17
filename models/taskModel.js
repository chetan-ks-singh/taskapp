const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

        content:{
            type:String,
            required:[true,'please write notes or task']
        },
        lastUpdatedOn:{
            type:Date,
            default:Date.now()
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        endDate:{
            type:Date,
            required:[true,'end date require']
        },
        completed:{
            type:Boolean,
            default:false
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;