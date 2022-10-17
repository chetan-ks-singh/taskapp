const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please give name']
    },
    email:{
        type:String,
        required:[true,'please provide email'],
        unique:[true,'this email already taken']
    },
    password:{
        type:String,
        required:[true,'please provide password']
    },
    darkMode:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()

    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
userSchema.virtual('tasks',{
    ref:'Task',
    foreignField:'user',
    localField:'_id'
});


userSchema.pre('save',async function(next){

    if( !this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();

})

userSchema.methods.checkPassword=async function(candidatePassword,userPassword){

 return await bcrypt.compare(candidatePassword,userPassword);

}

const User = mongoose.model('User',userSchema);

module.exports = User;