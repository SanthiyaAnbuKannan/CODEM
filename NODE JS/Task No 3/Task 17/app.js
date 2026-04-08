const http = require("http");

const server = http.createServer((req, res) => {
    const startTime = Date.now();

    let body = "";

    if (req.url === "/") {
        body = "Home Page";
    } else if (req.url === "/api") {
        body = "API Route";
    } else {
        body = "Page not found";
    }

    const responseTime = Date.now() - startTime;

    res.setHeader("X-Powered-By", "Node.js");
    res.setHeader("X-Response-Time", `${responseTime}ms`);
    res.setHeader("Content-Type", "text/html");

    console.log("Response Headers Sent:");
    console.log(res.getHeaders());

    res.end(body);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});