const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let fileName = "";

    if (req.url === "/") {
        fileName = "home.html";
    } else if (req.url === "/about") {
        fileName = "about.html";
    } else if (req.url === "/contact") {
        fileName = "contact.html";
    } else {
        res.end("Page not found");
        return;
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.end("Error loading page");
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});