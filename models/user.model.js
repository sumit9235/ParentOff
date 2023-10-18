const mongoose = require('mongoose')
const userSchema=({
    name:String,
    std:String,
    marks:String
})

const UserModel=mongoose.model("users",userSchema)

module.exports={
    UserModel
}