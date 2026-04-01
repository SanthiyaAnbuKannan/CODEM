const fs = require("fs");

function fetchUserData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching user ${id}...`);
            if (id > 10) reject("User not found");
            else resolve({ id, name: "Arun", email: "arun@mail.com" });
        }, 400);
    });
}

function validateUser(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Validating email...");
            if (!user.email.includes("@")) reject("Invalid email");
            else resolve(user);
        }, 200);
    });
}

function enrichUser(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Enriching user data...");
            resolve({ ...user, role: "admin", joinedAt: new Date().toISOString() });
        }, 300);
    });
}

function saveUser(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Saving to users.json...");
            fs.writeFile("users.json", JSON.stringify(user, null, 2), (err) => {
                if (err) reject("Save failed");
                else resolve(user);
            });
        }, 200);
    });
}

async function main() {
    try {
        let user = await fetchUserData(5);

        try {
            user = await validateUser(user);
        } catch (err) {
            console.log("Validation failed, using default user");
            user = { id: 0, name: "Default", email: "default@mail.com" };
        }

        user = await enrichUser(user);

        try {
            user = await saveUser(user);
        } catch (err) {
            console.log("Retrying save...");
            user = await saveUser(user);
        }

        console.log("Done:", user);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();