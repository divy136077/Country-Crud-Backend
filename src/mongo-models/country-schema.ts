import mongoose, { Schema } from "mongoose";

const countrySchema = new Schema({

    Name: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        // required:true
    },
    Status:{
        type:String
    },
})

const country = mongoose.model("country", countrySchema)

export default country;