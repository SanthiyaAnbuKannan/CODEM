const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("productAdded", (productName) => {
    console.log("Product saved to database");
});

emitter.on("productAdded", (productName) => {
    console.log("Email notification sent");
});

emitter.on("productAdded", (productName) => {
    console.log("Inventory updated");
    console.log("Product Name:", productName);
});

emitter.emit("productAdded", "Laptop");