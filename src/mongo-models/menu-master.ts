import mongoose, { Schema } from "mongoose";
const menuSchema = new Schema({

    Name:{
        type: String
    },
    Status:{
        type:String
    },
})

const menu = mongoose.model( "menu" , menuSchema )

export default menu ;