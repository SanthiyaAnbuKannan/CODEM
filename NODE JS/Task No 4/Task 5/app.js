const express = require("express");
const app = express();

let products = [
    { id: 101, name: "Laptop", price: 50000, category: "Electronics" },
    { id: 102, name: "Phone", price: 20000, category: "Electronics" },
    { id: 103, name: "Shoes", price: 2000, category: "Fashion" },
    { id: 104, name: "Watch", price: 3000, category: "Accessories" },
    { id: 105, name: "Bag", price: 1500, category: "Travel" }
];

app.get("/api/products", (req, res) => {
    console.log("Products API called");

    const sorted = products.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json({
        totalProducts: products.length,
        data: sorted
    });
});

app.listen(3000);