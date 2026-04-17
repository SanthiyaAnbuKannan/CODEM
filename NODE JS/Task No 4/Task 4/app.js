const express = require("express");
const app = express();

// Log static requests
app.use((req, res, next) => {
    console.log(`Static request: ${req.url}`);
    next();
});

// Serve public folder
app.use(express.static("public"));

app.listen(3000, () => console.log("Static server running"));