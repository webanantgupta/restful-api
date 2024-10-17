const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true  // [true,"name is required"]
    },
    email:{
        type:String,
        required:true,  // [true,"email is required"]
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    profilePic:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
    },
    coverPic:{
        type:String
    },
},{timestamps:true})

// to add more fields later
userSchema.add({
    followers:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'user'
        }
    ],
    followings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})

module.exports = mongoose.model('user',userSchema)