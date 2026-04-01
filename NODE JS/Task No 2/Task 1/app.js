const http = require("http");

let requestCounts = {};

function logger(req, res, next) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
}

function auth(req, res, next) {
    if (req.headers["x-auth"] === "secret123") {
        console.log("Auth passed");
        next();
    } else {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("401 Unauthorized");
    }
}

function rateLimit(req, res, next) {
    const ip = req.socket.remoteAddress;
    const now = Date.now();

    if (!requestCounts[ip]) {
        requestCounts[ip] = [];
    }

    requestCounts[ip] = requestCounts[ip].filter(time => now - time < 60000);

    if (requestCounts[ip].length >= 5) {
        res.writeHead(429, { "Content-Type": "text/plain" });
        res.end("429 Too Many Requests");
    } else {
        requestCounts[ip].push(now);
        console.log(`Rate limit: ${requestCounts[ip].length}/5`);
        next();
    }
}

function runMiddlewares(req, res, middlewares) {
    let index = 0;

    function next() {
        if (index < middlewares.length) {
            middlewares[index++](req, res, next);
        }
    }

    next();
}

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/secure") {
        runMiddlewares(req, res, [
            logger,
            auth,
            rateLimit,
            (req, res) => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Secure content");
                console.log("Response sent");
            }
        ]);
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Task 1 server running on http://localhost:3000");
});