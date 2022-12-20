const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Employer = require("./models/Employer");
const Freelancer = require("./models/Freelancer");
const Offer = require("./models/Offer");
mongoose
    .connect(
        "mongodb+srv://anwarjabri:6194021111426@cluster0.5kebrbw.mongodb.net/MYEVENTS?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected to db"))
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());

app.post("/createEmployer", (req, res) => {
    try {
        let { name } = req.body;
        const employer = new Employer({ name });
        employer.save();
        res.status(200).json({ status: true, message: "Success" });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ error });
    }
});
app.post("/createFreelancer", (req, res) => {
    try {
        let { name } = req.body;
        const freelancer = new Freelancer({ name });
        freelancer.save();
        res.status(200).json({ status: true, message: "Success" });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ error });
    }
});
app.post("/createOffer/:id", async (req, res) => {
    try {
        let { title } = req.body;
        let { id } = req.params;
        const offer = new Offer({ title, empId: id });
        await offer.save();
        res.status(200).json({ status: true, message: "Success" });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ error });
    }
});
app.put("/postuler", async (req, res) => {
    try {
        let { offerId, userId } = req.query;
        const { name } = await Freelancer.findById(userId);
        const newApply = await Offer.findByIdAndUpdate(
            offerId,
            {
                $push: {
                    freeLancersId: { freelacerName: name },
                },
            },
            { new: true }
        );
        res.status(200).json({
            status: true,
            message: "Success",
            data: newApply,
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ error });
    }
});
app.get("/getOffer/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { freeLancersId } = await Offer.findById(id);

        return res.status(200).json({
            status: true,
            message: "ok",
            data: freeLancersId,
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
});

app.listen(5000, () => {
    console.log("server is up");
});
