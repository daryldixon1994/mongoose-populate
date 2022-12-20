const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema({
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

module.exports = User = mongoose.model("User", userSchema);
