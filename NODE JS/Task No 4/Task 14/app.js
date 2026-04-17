const express = require("express");
const app = express();
app.use(express.json());

let users = [];

app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: "Name required" });
    }

    users.push(req.body);
    console.log("User created");
    res.status(201).json({ message: "User created successfully" });
});

app.put("/users/:id", (req, res) => {
    console.log("User updated");
    res.json({ message: "User updated successfully" });
});

app.delete("/users/:id", (req, res) => {
    console.log("User deleted");
    res.json({ message: "User deleted successfully" });
});

app.listen(3000);