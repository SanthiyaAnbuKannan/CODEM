const express = require("express");
const app = express();

let products = [
    { name: "Laptop", category: "electronics" },
    { name: "Shoes", category: "fashion" }
];

app.get("/search", (req, res) => {
    const { name, category } = req.query;
    console.log("Search query:", req.query);

    if (!name && !category) {
        return res.status(400).json({ error: "Provide search query" });
    }

    const result = products.filter(p =>
        (!name || p.name.toLowerCase().includes(name.toLowerCase())) &&
        (!category || p.category === category)
    );

    res.status(200).json({
        resultCount: result.length,
        data: result
    });
});

app.listen(3000);