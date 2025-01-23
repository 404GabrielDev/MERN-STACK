import mongoose from "mongoose";

const blacklist = new mongoose.Schema({
    token: {
        type:String,
        required:true,
    },
    expiresAt: {
        type: Date,
        required:true,
    },
},{timestamps:true})

blacklist.index({expiresAt:1}, {expireAfterSeconds:0})

const Blacklist = mongoose.model("Blacklist", blacklist)

export default Blacklist;