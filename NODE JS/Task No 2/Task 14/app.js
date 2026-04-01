const http = require("http");

let totalRequests = 0;
let successCount = 0;
let errorCount = 0;
let totalResponseTime = 0;

const server = http.createServer((req, res) => {
    const start = Date.now();
    totalRequests++;

    function finish(statusCode, data) {
        const time = Date.now() - start;
        totalResponseTime += time;

        if (statusCode >= 200 && statusCode < 400) successCount++;
        else errorCount++;

        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }

    if (req.url === "/hello") {
        const delay = Math.floor(Math.random() * 401) + 100;
        setTimeout(() => {
            finish(200, { message: "Hello!" });
        }, delay);
    }
    else if (req.url === "/fail") {
        finish(500, { error: "Server failed" });
    }
    else if (req.url === "/stats") {
        finish(200, {
            totalRequests,
            successCount,
            errorCount,
            avgResponseTime: `${Math.round(totalResponseTime / totalRequests)}ms`
        });
    }
    else {
        finish(404, { error: "Not found" });
    }
});

server.listen(3006, () => {
    console.log("Task 14 server running on http://localhost:3006");
});