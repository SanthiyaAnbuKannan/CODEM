const EventEmitter = require("events");

const emitter = new EventEmitter();
let orderCount = 0;

emitter.on("orderPlaced", () => {
    orderCount++;
    console.log("Order placed successfully");
    console.log("Total Orders:", orderCount);
    console.log("----------------------");
});

for (let i = 0; i < 5; i++) {
    emitter.emit("orderPlaced");
}