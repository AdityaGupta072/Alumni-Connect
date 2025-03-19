const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "alumni", "faculty"], required: true },
    institution: { type: String, required: true },
    graduationYear: {type:Number},
    profession: {type:String},
    bio: {type:String},
    connections:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}]  //followers and connections
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
