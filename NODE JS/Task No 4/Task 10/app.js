const express = require("express");
const app = express();

let items = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

app.get("/items", (req, res) => {
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page <= 0 || limit <= 0) {
        return res.status(400).json({ error: "Invalid page or limit" });
    }

    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    console.log(`Pagination: page ${page}, limit ${limit}`);

    res.status(200).json({
        page,
        limit,
        totalItems: items.length,
        data
    });
});

app.listen(3000);