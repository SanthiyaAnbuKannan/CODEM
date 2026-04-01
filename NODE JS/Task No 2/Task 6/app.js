const EventEmitter = require("events");
const fs = require("fs");

const emitter = new EventEmitter();

emitter.on("dataReceived", async (data) => {
    console.log("dataReceived →", data);

    if (data.id && data.value !== undefined) {
        emitter.emit("dataValid", data);
    } else {
        emitter.emit("dataInvalid", data);
    }
});

emitter.on("dataValid", async (data) => {
    console.log("dataValid     → validation passed");

    const transformed = { ...data, value: data.value * 2 };
    emitter.emit("dataProcessed", transformed);
});

emitter.on("dataProcessed", async (data) => {
    console.log("dataProcessed →", data);

    fs.writeFile("result.txt", JSON.stringify(data, null, 2), (err) => {
        if (!err) {
            emitter.emit("dataSaved");
        }
    });
});

emitter.on("dataSaved", () => {
    console.log("dataSaved     → written to result.txt");
});

emitter.on("dataInvalid", () => {
    console.log("Invalid data received");
});

emitter.emit("dataReceived", { id: 1, value: 42 });