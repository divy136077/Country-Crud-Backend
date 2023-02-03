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
    IsActive:{
        type:String
    },
    deleted: {
         type: Boolean, 
         index: true,
         default: false 
    }
})

const state = mongoose.model( "state" , stateSchema )

export default state ;