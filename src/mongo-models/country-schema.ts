import mongoose, {Schema } from "mongoose";

const countrySchema = new Schema({

    Name:{
        type:String,
        required:true
    },
    Code:{
        type:String,
        required:true
    },
    InActive:{
        type:Boolean

    },
    IsActive:{
        type:Boolean
    }
})

const country = mongoose.model( "country" , countrySchema )

export default country ;