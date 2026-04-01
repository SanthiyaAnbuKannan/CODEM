const http = require("http");

function getUsers() {
    return new Promise(resolve => {
        setTimeout(() => resolve(["Arun", "Priya", "Kiran"]), 500);
    });
}

function getOrders() {
    return new Promise(resolve => {
        setTimeout(() => resolve([101, 102, 103, 104]), 600);
    });
}

const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/summary") {
        try {
            const [users, orders] = await Promise.all([getUsers(), getOrders()]);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                users,
                orders,
                totalUsers: users.length,
                totalOrders: orders.length
            }, null, 2));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to fetch data" }));
        }
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3011, () => {
    console.log("Task 21 server running on http://localhost:3011");
});