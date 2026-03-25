const fs = require('fs');
fs.readFile('story.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }
    const lines = data.trim().split('\n');
    console.log("Total Lines:", lines.length);
});