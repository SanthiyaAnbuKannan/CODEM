const express = require("express");
const app = express();

const auth = (req, res, next) => {
    const token = req.headers["authorization"];

    console.log("Auth attempt");

    if (token === "validtoken") {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized access" });
    }
};

app.get("/dashboard", auth, (req, res) => {
    res.json({ message: "Welcome to dashboard" });
});

app.get("/", (req, res) => {
    res.json({ message: "Public route" });
});

app.listen(3000);