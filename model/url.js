const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl : {
        type:String,
        required:true
    },
},{timeStamP:true});

const urlModel = mongoose.model("url",userSchema);

module.exports = urlModel;