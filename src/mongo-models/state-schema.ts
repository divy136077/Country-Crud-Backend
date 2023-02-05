import mongoose, { Schema } from "mongoose";
const stateSchema = new Schema({

    CountryName:{
        type: String,
        ref: "country"
    },
    StateName:{
        type:String,
        required:true
    },
    Status:{
        type:String
    },
})

const state = mongoose.model( "state" , stateSchema )

export default state ;