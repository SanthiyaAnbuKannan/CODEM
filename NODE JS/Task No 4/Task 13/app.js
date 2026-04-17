const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    next(new Error("Something failed"));
});

app.use((err, req, res, next) => {
    console.log("Error:", err.message);

    res.status(500).json({
        error: err.message,
        status: 500
    });
});

app.listen(3000);