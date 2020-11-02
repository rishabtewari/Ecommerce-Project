const mongoose = require("mongoose");
const uniquev=require("mongoose-unique-validator");
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        }
    },
    { timestamps: true }
);
categorySchema.plugin(uniquev);
module.exports = mongoose.model("Category", categorySchema);
