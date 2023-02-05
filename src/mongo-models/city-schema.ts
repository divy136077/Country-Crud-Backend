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
    Status:{
        type:String
    },
})

const city = mongoose.model( "city" , citySchema )

export default city ;