const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    candidat: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catgory",
        required: true
    },

    rating:{
        type:Number,
        required:true,
        default:0
    },
    number:{
        type:String,
        required:true
    }

}, {
    timestamps: true,
});

const RatingModal = mongoose.model("Rating", userSchema);
module.exports = RatingModal;
