const mongoose = require("mongoose");
const { type } = require("os");

const postSchema = new mongoose.Schema({
    Image:[String],

    caption:{
        type:String,
        required:true
    }
});

const postModel = mongoose.model("post",postSchema);

module.exports = postModel