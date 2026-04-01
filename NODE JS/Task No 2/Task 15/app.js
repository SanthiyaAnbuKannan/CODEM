const http = require("http");

function validateOrder(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order.item && order.qty && order.userId) resolve(order);
            else reject({ code: 400, message: "Invalid order" });
        }, 200);
    });
}

function checkInventory(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order.qty <= 5) resolve(true);
            else reject({ code: 409, message: "Out of stock" });
        }, 300);
    });
}

function chargePayment(order) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });
}

function createShipment() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("TRK-8821"), 300);
    });
}

function sendConfirmation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 300);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/orders") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", async () => {
            try {
                const order = JSON.parse(body);

                await validateOrder(order);
                await Promise.all([checkInventory(order), chargePayment(order)]);
                const [trackingId, emailSent] = await Promise.all([
                    createShipment(),
                    sendConfirmation()
                ]);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    orderId: "ORD-1042",
                    status: "confirmed",
                    trackingId,
                    emailSent
                }, null, 2));
            } catch (err) {
                res.writeHead(err.code || 500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message || "Order failed" }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3007, () => {
    console.log("Task 15 server running on http://localhost:3007");
});