const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/User");
const Story = require("./models/Story");
mongoose
    .connect(
        "mongodb+srv://anwarjabri:6194021111426@cluster0.5kebrbw.mongodb.net/MYEVENTS?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected to db"))
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());

app.post("/createUser", (req, res) => {
    try {
        let { name } = req.body;
        const user = new User({ name });
        user.save();
        res.status(200).json({ status: true, message: "Success" });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ error });
    }
});
app.post("/createStory/:id", async (req, res) => {
    try {
        let { title } = req.body;
        let { id } = req.params;
        const user = await User.findById(id);
        const story = new Story({ title, author: user._id });
        await story.save();
        res.status(200).json({ status: true, message: "Success" });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ error });
    }
});
app.get("/getStory/:id", async (req, res) => {
    // try {
    //     let { name } = req.body;
    //     const person = await User.findOne({ firstname: name }).populate(
    //         "eventsAttended"
    //     );
    //     res.status(200).json({ status: true, data: person });
    // } catch (error) {
    //     if (error) throw error;
    // }
    let { id } = req.params;
    const author = await Story.findById(id).populate("author").exec();
    res.status(200).json({ data: author });
});

app.listen(5000, () => {
    console.log("server is up");
});
