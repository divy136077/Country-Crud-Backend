import mongoose, {Schema } from "mongoose";

const citySchema = new Schema({

    CountryName:{
        type: String,
        ref: "country"
    },
    StateName:{
        type:String,
        ref: "state"
    },
    CityName:{
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

const city = mongoose.model( "city" , citySchema )

export default city ;