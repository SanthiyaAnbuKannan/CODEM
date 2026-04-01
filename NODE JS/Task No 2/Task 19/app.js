function getUser(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id, name: "Arun" }), 500);
    });
}

function getPosts(user) {
    return new Promise(resolve => {
        setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 400);
    });
}

function formatOutput(posts) {
    return new Promise(resolve => {
        setTimeout(() => resolve(posts.join(", ")), 200);
    });
}

getUser(1)
    .then(user => {
        console.log("User:", user.name);
        return getPosts(user);
    })
    .then(posts => formatOutput(posts))
    .then(result => {
        console.log("Posts:", result);
    })
    .catch(err => {
        console.error("Error:", err);
    });