const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    matn: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    tests: [
        {
            savol: {
                type: String,
                required: true
            },
            variantlar: [
                {
                    type: Object,
                    required: true
                }
            ]
        }
    ],


}, {
    timestamps: true,
});

module.exports = mongoose.model("Question", userSchema);
