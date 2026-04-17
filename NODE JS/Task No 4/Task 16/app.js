const express = require("express");
const app = express();
app.use(express.json());

let posts = [];

app.get("/posts", (req, res) => res.json(posts));

app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ error: "All fields required" });
    }

    posts.push(req.body);
    console.log("Post created");

    res.status(201).json({ message: "Post created successfully" });
});

app.put("/posts/:id", (req, res) => {
    res.json({ message: "Post updated successfully" });
});

app.delete("/posts/:id", (req, res) => {
    res.json({ message: "Post deleted successfully" });
});

app.listen(3000);