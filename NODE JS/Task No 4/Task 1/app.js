const express = require("express");
const app = express();
const PORT = 3000;

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.url}`);
    next();
});

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
        status: "OK"
    });
});

app.get("/status", (req, res) => {
    res.status(200).json({
        status: "Server Active"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});