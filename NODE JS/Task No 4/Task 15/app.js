const express = require("express");
const app = express();
app.use(express.json());

let products = [];

app.get("/products", (req, res) => res.json(products));

app.post("/products", (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ error: "Invalid product" });
    }

    products.push(req.body);
    console.log("Product added");
    res.status(201).json({ message: "Product created successfully" });
});

app.put("/products/:id", (req, res) => {
    res.json({ message: "Product updated successfully" });
});

app.delete("/products/:id", (req, res) => {
    res.json({ message: "Product deleted successfully" });
});

app.listen(3000);