const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/image") {
        const imageStream = fs.createReadStream("image.jpg");
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        imageStream.pipe(res);
    } else {
        res.end("Go to /image");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});