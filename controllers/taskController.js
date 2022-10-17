const Task=require('./../models/taskModel');
const express = require('express');

exports.createTask = async(req,res)=>{
    try{
        if(!req.currentUser) throw new Error("please login !");
        const loggedinUser = req.currentUser;
        const task=await Task.create({content:req.body.content,user:loggedinUser._id,endDate:req.body.endDate});
        res.status(200).json({
            status:'ok',
            message:'successfully created',
            data:{
                task
            }
        })

    }catch(err){
      res.json({
        status:'fail',
        message:err.message
      })

    }
}

exports.getTask = async(req,res)=>{
    try{
        if(!req.currentUser) throw new Error('please login');
        if(!req.params.taskid) throw new Error('slotID is not present....')

        const taskId = req.params.taskid;
        const task = await Task.findById({_id:taskId,user:req.currentUser.id});
        if(!task) throw new Error('Task Not Found !')
        res.status(200).json({
            status:'ok',
            data:{
                task
            }
        })
    }catch(err){
        res.json({
            status:'fail',
            message:err.message
        })
    }
 
}

exports.updateTask = async(req,res)=>{
    try{
        if(!req.currentUser) throw new Error('please login');
        if(!req.params.taskid) throw new Error('slotID is not present....')
        const updatedTask = req.body;
        const taskId = req.params.taskid;
        const task = await Task.findById({_id:taskId,user:req.currentUser.id});
        if(!task) throw new Error('Task not found');
        task.content = updatedTask.content;
        task.lastUpdatedOn = Date.now();
        await task.save({validateBeforeSave:false});
        res.json({
            status:'ok',
            message:'you have successfully updated the Task.',
            data:{
                task
            }
        })


    }catch(err){
        res.json({
            status:'fail',
            message:err.message

        })

    }
}


exports.deleteTask = async(req,res)=>{
    try{
        if(!req.currentUser) throw new Error('please login');
        if(!req.params.taskid) throw new Error('slotID is not present....')

        const task = await Task.findOneAndDelete({_id:req.params.taskid,user:req.currentUser.id});
        if(!task) throw new Error('Task not Found !')
        res.json({
            status:'ok',
            message:'you have successfully deleted the Task.'
        })

    }catch(err){
        res.json({
            status:'fail',
            message:err.message
        })

    }
}

// exports.getMyAllTasks = async(req,res)=>{
//     try{
//         console.log("yes")
//        if(!req.currentUser) throw new Error('please login!')
//         const tasks = await Task.find({user:req.currentUser.id}).populate('user');
//         res.status(200).json({
//             status:'ok',
//             data:{
//                 tasks

//             }
//         })





//     }catch(err){
//         res.json({
//             status:'fail',
//             message:err.message
//         })

//     }
// }


exports.mytask = async(req,res)=>{
    try{
        let query;
        if(!req.currentUser) throw new Error('please login');
         const now = new Date();
        // let month = now.getMonth()+1;
        let todayDate = new Date(now.getFullYear(),now.getMonth(),now.getDate());
        
        query =  Task.find({user:req.currentUser._id});
       
        const tasks = req.query;
        if(tasks.task=='today'){
           
                
                query = query.find({endDate:todayDate,completed:'false'});

        }
        else if(tasks.task=='upcoming'){
            
            console.log(todayDate.getDate(),todayDate.getFullYear(),todayDate.getMonth())
            query = query.find({endDate:{$gt:todayDate},completed:'false'})
        }
        else if(tasks.task=='completed'){
            query = query.find({completed:true})
        }
        else if(tasks.task=='pending'){
            query = query.find({completed:false,endDate:{$lt:todayDate}});
        }
        const myTasks = await query;
        if(myTasks.length==0)throw new Error('You dont have any pending Tasks')
        res.json({
            status:'ok',
            data:{
                    myTasks
            }
        })

    }catch(err){
        res.json({
            status:'fail',
            message:err.message
        })

    }
}

exports.markDone = async(req,res)=>{
    try{
        if(!req.currentUser) throw new Error('please login');
        const id = req.params.taskid;
        
        const task = await Task.findById(id);
        if(!task) throw new Error('task not found!');
        task.completed = true;
        await task.save({validateBeforeSave:false});
        res.json({
           status:'ok',
         message:'completed !'

        })

    }catch(err){
        res.json({
            status:'fail',
            message:err.message

        })

    }
}

exports.deleteCompletedTask = async(req,res)=>{
    try{
        if(!req.currentUser)throw new Error('please login !');
        const task = await Task.deleteMany({user:req.currentUser._id,completed:true});
        res.json({
            status:'ok',
            message:'successfully cleared task'

        })

    }catch(err){
        res.json({
            statsu:'fail',
            message:err.message
        })

    }
}