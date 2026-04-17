const express = require("express");
const app = express();

app.get("/home", (req, res) => {
    console.log("Home route accessed");
    res.status(200).json({
        route: "home",
        message: "Welcome to Home Page",
        time: new Date()
    });
});

app.get("/about", (req, res) => {
    console.log("About route accessed");
    res.status(200).json({
        route: "about",
        message: "About Page",
        time: new Date()
    });
});

app.get("/contact", (req, res) => {
    console.log("Contact route accessed");
    res.status(200).json({
        route: "contact",
        message: "Contact Page",
        time: new Date()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => console.log("Server running"));