const http = require("http");
const fs = require("fs");

function validateFile(size) {
    return new Promise((resolve, reject) => {
        if (size > 1024 * 1024) reject("File too large");
        else resolve();
    });
}

function scanFile() {
    return new Promise(resolve => setTimeout(resolve, 500));
}

function saveFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile("photo.jpg", data, (err) => {
            if (err) reject(err);
            else resolve("photo.jpg");
        });
    });
}

function generateThumbnail() {
    return new Promise(resolve => {
        setTimeout(() => resolve("thumb_photo.jpg"), 300);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/upload") {
        const chunks = [];

        req.on("data", chunk => chunks.push(chunk));

        req.on("end", async () => {
            try {
                const fileData = Buffer.concat(chunks);

                await validateFile(fileData.length);
                await scanFile();

                const [filename, thumbnail] = await Promise.all([
                    saveFile(fileData),
                    generateThumbnail()
                ]);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    filename,
                    size: `${Math.round(fileData.length / 1024)}KB`,
                    thumbnail
                }, null, 2));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.toString() }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3009, () => {
    console.log("Task 17 server running on http://localhost:3009");
});