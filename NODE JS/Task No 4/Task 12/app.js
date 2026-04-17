const express = require("express");
const app = express();
app.use(express.json());

const validate = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        console.log("Validation failed");
        return res.status(400).json({ error: "Name and email are required" });
    }

    next();
};

app.post("/user", validate, (req, res) => {
    res.status(200).json({ message: "Valid data received" });
});

app.listen(3000);