const fs = require("fs");

function readFile(filename) {
    return new Promise((resolve, reject) => {
        console.log("Reading file...");
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function parseContent(content) {
    return new Promise((resolve) => {
        const lines = content.split("\n");
        const filtered = lines.filter(line => line.trim() !== "");
        console.log(`Parsing ${lines.length} lines, ${lines.length - filtered.length} empty removed`);
        resolve(filtered);
    });
}

function saveProcessed(lines) {
    return new Promise((resolve, reject) => {
        fs.writeFile("output.txt", lines.join("\n"), (err) => {
            if (err) reject(err);
            else {
                console.log("Saved to output.txt");
                resolve();
            }
        });
    });
}

function watchAndProcess(filename) {
    fs.watch(filename, async () => {
        console.log(`File changed: ${filename}`);
        try {
            const content = await readFile(filename);
            const parsed = await parseContent(content);
            await saveProcessed(parsed);
        } catch (err) {
            console.error("Error:", err.message);
        }
    });
}

watchAndProcess("data.txt");
console.log("Watching data.txt...");