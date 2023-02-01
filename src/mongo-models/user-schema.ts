import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    Name: {
        type: String,

    },
    Email: {
        type: String,

    },
    Number: {
        type: Number,

    },
    IsActive: {
        type: String
    },
    Image: {
        type: String,
    },
    Dob: {
        type: String,
    },
    deleted: {
        type: Boolean,
        index: true,
        default: false
    }
})

const user = mongoose.model("user", userSchema)

export default user;