const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MovieSchema = new mongoose.Schema(
    {
        moviename: {
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        theatername:{
            type: String,
            required: true
        },
        ticketprice:{
            type: String,
            required: true
        },
        userid:{
            type: String,
            required: true
        },
        ticketImg:{
            type: String,
            required: true
        },
        status:{
            type: Boolean,
            dafault: true
        }
    }
)

module.exports = mongoose.model("Movie", MovieSchema);