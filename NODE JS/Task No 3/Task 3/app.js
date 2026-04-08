const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/stream") {
        const readStream = fs.createReadStream("bigfile.txt", "utf8");
        res.writeHead(200, { "Content-Type": "text/plain" });
        readStream.pipe(res);
    } else {
        res.end("Go to /stream");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});