const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const offerSchema = Schema({
    title: String,
    age: Number,
    empId: Schema.Types.ObjectId,
    freeLancersId: [
        {
            freelacerName: String,
        },
    ],
});

module.exports = Offer = mongoose.model("Offer", offerSchema);
