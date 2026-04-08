const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Headers Received:");
    console.log(req.headers);

    res.end("Headers printed in console");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});