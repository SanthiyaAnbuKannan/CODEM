function recursiveChain(n, current = 1) {
    if (current > n) {
        process.nextTick(() => console.log("nextTick after chain"));
        setImmediate(() => console.log("immediate after chain"));
        setTimeout(() => console.log("timeout after chain"), 0);
        return Promise.resolve();
    }

    return Promise.resolve()
        .then(() => {
            console.log(`Step ${current}`);
            return recursiveChain(n, current + 1);
        });
}

recursiveChain(5);