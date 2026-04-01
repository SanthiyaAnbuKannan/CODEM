const http = require("http");

function parseJSON(body) {
    return JSON.parse(body);
}

function validateSchema(data) {
    if (!data.name || !data.age || !data.email) {
        throw new Error("Validation failed");
    }
    return data;
}

function transformData(data) {
    return {
        name: data.name.toUpperCase(),
        age: data.age,
        email: "xyz@gmail.com"
    };
}

function buildResponse(data) {
    return { success: true, data };
}

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/process") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                let data = parseJSON(body);
                data = validateSchema(data);
                data = transformData(data);
                const response = buildResponse(data);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(response, null, 2));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3004, () => {
    console.log("Task 11 server running on http://localhost:3004");
});