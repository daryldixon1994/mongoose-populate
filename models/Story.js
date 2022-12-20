const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
module.exports = Story = mongoose.model("Story", storySchema);
