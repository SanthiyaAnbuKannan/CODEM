const http = require("http");

let activeRequests = 0;
const maxConcurrent = 2;
const queue = [];
let requestId = 0;

function processRequest(id, res) {
    activeRequests++;
    console.log(`Request ${id}: processing`);

    const start = Date.now();

    setTimeout(() => {
        const timeTaken = Date.now() - start;
        console.log(`Request ${id}: done in ${timeTaken}ms`);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Request ${id} completed`);

        activeRequests--;
        processNext();
    }, 1000);
}

function processNext() {
    if (queue.length > 0 && activeRequests < maxConcurrent) {
        const { id, res } = queue.shift();
        processRequest(id, res);
    }
}

const server = http.createServer((req, res) => {
    requestId++;

    if (activeRequests < maxConcurrent) {
        processRequest(requestId, res);
    } else {
        console.log(`Request ${requestId}: queued (waiting)`);
        queue.push({ id: requestId, res });
    }
});

server.listen(3001, () => {
    console.log("Task 2 server running on http://localhost:3001");
});