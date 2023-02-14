import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    Name: {
        type: String,

    },
    Email: {
        type: String,

    },
    Password:{
        type:String,   
    },
    Number: {
        type: Number,

    },
    Image: {
        type: String,
    },
    Dob: {
        type: String,
    },
    Status:{
        type:String,
    },
    IsAdmin:{
        type:Boolean,
    },
    menuId:{
        type:String
    }
})

const user = mongoose.model("user", userSchema)

export default user;