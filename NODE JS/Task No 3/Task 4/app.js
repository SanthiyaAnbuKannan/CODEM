const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/readfile") {
        fs.readFile("sample.txt", "utf8", (err, data) => {
            if (err) {
                res.end("Error reading file");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        });
    } 
    else if (req.url === "/streamfile") {
        const readStream = fs.createReadStream("sample.txt", "utf8");
        res.writeHead(200, { "Content-Type": "text/plain" });
        readStream.pipe(res);
    } 
    else {
        res.end("Visit /readfile or /streamfile");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});