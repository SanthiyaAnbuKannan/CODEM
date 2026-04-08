const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to my Node Server");
    } 
    else if (req.url === "/about") {
        res.end("This server is built using Node.js");
    } 
    else if (req.url === "/contact") {
        res.end("Contact information");
    } 
    else {
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});