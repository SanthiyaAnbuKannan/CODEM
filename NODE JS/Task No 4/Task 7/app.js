const express = require("express");
const app = express();

let products = [
    { id: 1, name: "Laptop", price: 50000 }
];

app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    console.log("Requested ID:", id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
        ...product,
        requestedAt: new Date()
    });
});

app.listen(3000);