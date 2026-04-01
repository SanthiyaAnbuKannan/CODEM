function createPromise(name, delay) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(name), delay);
    });
}

function withTimeout(promise, ms, name) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(`${name} timed out`), ms)
        )
    ]);
}

const tasks = [
    withTimeout(createPromise("fetch1", 400), 1000, "fetch1"),
    withTimeout(createPromise("fetch2", 1200), 1000, "fetch2"),
    withTimeout(createPromise("fetch3", 800), 1000, "fetch3"),
    withTimeout(createPromise("fetch4", 2500), 1000, "fetch4"),
    withTimeout(createPromise("fetch5", 600), 1000, "fetch5")
];

Promise.allSettled(tasks).then(results => {
    const fulfilled = [];
    const timedOut = [];

    results.forEach(r => {
        if (r.status === "fulfilled") {
            fulfilled.push(r.value);
        } else {
            timedOut.push(r.reason.split(" ")[0]);
        }
    });

    console.log("Fulfilled:", fulfilled.join(", "));
    console.log("Timed out:", timedOut.join(", "));
});