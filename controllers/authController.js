const User = require('./../models/userModel');
const Task = require('./../models/taskModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const signToken=(id)=>{
    return (jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    }))
}

sendToken = async(user,res)=>{
    const token = signToken(user._id);//signing Token.........
    const cookieOptions={
        expires:new Date(Date.now() + process.env.JWT_SECRET_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
    if(process.env.NODE_ENV==='production') cookieOptions.secure='true';
    res.cookie('jwt',token,cookieOptions);//sending Token to the user's browser......
    res.json({
        status:"ok",
        token,
        user
    })
}


exports.login = async(req,res)=>{

    try{
        const {email,password} = req.body;
        if(!email||!password) throw new Error('Please enter email or password')
        const user = await User.findOne({email});
        if(!user) throw new Error('user not exist');
        //decrypt password and compare.....
        const hashedPassword =await  user.checkPassword(password,user.password);
        if(!hashedPassword) throw new Error('password is incorrect !')
        sendToken(user,res);//token send to the browser and it will come in each and every request till expiry.......
    

    }catch(err){
        res.json({
            status:'fail',
            message:err.message
        })

    }

}


exports.isLoggedInUser = async(req,res,next)=>{
    try{
        
   
        if(req.cookies.jwt) {
            const token = req.cookies.jwt;
            const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
            
            const user = await User.findById(decoded.id);
            
            if(!user) return next();
            req.currentUser = user;
           
           return next();
    
        }
        return next();
       

    }catch(err){
        
      return next();
      

    }
}

exports.logout = async(req,res)=>{
    try{
        if(!req.currentUser) throw new Error('please login')
        res.cookie('jwt','loggedout',{
            expires:new Date(Date.now()+10*1000)
        })
        res.status(200).json({
            status:'ok',
            message:'you are successfully logged out'
        })

    }catch(err){
            res.json({
                status:'fail',
                message:err.message
            })

    }
}