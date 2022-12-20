const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const empSchema = Schema({
    name: String,
    age: Number,
});

module.exports = Employer = mongoose.model("Employer", empSchema);
