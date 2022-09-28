const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        id:{
            type:String,
            required:false
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        pdob: {
            type: String,
            required: true
        },
        Groups: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Student", schema)