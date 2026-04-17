const express = require("express");
const app = express();

let users = [
    { username: "santhiya", email: "santhiyaanbukannan@mail.com", role: "student" }
];

app.get("/users/:username", (req, res) => {
    const username = req.params.username;
    console.log("User requested:", username);

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
        ...user,
        time: new Date()
    });
});

app.listen(3000);