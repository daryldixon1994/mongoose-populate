const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const freelancerSchema = Schema({
    name: String,
    age: Number,
});

module.exports = Freelancer = mongoose.model("Freelancer", freelancerSchema);
