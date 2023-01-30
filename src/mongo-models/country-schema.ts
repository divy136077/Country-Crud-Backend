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
    IsActive: {
        type:String
    }, 
    deleted: {
        type: Boolean, 
        index: true,
        default: false 
    }
})

const country = mongoose.model("country", countrySchema)

export default country;