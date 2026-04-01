const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && req.url === "/users") {
        res.writeHead(200);
        res.end(JSON.stringify({ users: ["Arun", "Priya", "Kiran"] }));
    }
    else if (req.method === "GET" && req.url === "/products") {
        res.writeHead(200);
        res.end(JSON.stringify({ products: ["Laptop", "Phone", "Tablet"] }));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

server.listen(3010, () => {
    console.log("Task 20 server running on http://localhost:3010");
});