const fs = require("fs");

function fetchRemoteData() {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = [
                { id: 1, name: "Arun" },
                { id: 2, name: "Priya" }
            ];
            console.log("Remote fetched: 2 records");
            resolve(data);
        }, 600);
    });
}

function fetchLocalData() {
    return new Promise(resolve => {
        setTimeout(() => {
            const data = [
                { id: 2, name: "Updated Priya" },
                { id: 3, name: "Kiran" }
            ];
            console.log("Local fetched: 2 records");
            resolve(data);
        }, 400);
    });
}

function syncData(remote, local) {
    return new Promise(resolve => {
        setTimeout(() => {
            const map = new Map();

            local.forEach(item => map.set(item.id, item));
            remote.forEach(item => map.set(item.id, item)); // remote wins

            const merged = Array.from(map.values());
            console.log("Synced: 3 records (1 conflict resolved)");
            resolve(merged);
        }, 300);
    });
}

function saveResult(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.writeFile("sync.json", JSON.stringify(data, null, 2), (err) => {
                if (err) reject(err);
                else {
                    console.log("Saved to sync.json");
                    resolve();
                }
            });
        }, 200);
    });
}

Promise.all([fetchRemoteData(), fetchLocalData()])
    .then(([remote, local]) => syncData(remote, local))
    .then(saveResult)
    .catch(console.error);