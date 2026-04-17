const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(`${req.method} ${req.url} - ${res.statusCode}`);
    });
    next();
});

app.get("/", (req, res) => res.send("Logger working"));
app.get("/test", (req, res) => res.send("Test route"));

app.listen(3000);