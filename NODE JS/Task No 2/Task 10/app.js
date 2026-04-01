const fs = require("fs");
const start = Date.now();

function log(phase, message) {
    console.log(`[${Date.now() - start}ms] ${phase} — ${message}`);
}

log("Sync", "call stack");

process.nextTick(() => log("nextTick", "microtask queue"));

Promise.resolve().then(() => log("Promise", "microtask queue"));

setTimeout(() => log("setTimeout", "timers phase"), 0);

setImmediate(() => log("setImmediate", "check phase"));

fs.readFile(__filename, () => {
    log("fs.readFile", "I/O callbacks phase");
});