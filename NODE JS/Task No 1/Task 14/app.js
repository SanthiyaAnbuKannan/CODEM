const fs = require('fs');
const createGreeting = require('./greetings');
fs.readFile('names.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }
    const greetings = data
        .trim()
        .split('\n')
        .map(name => createGreeting(name))
        .join('\n');
    fs.writeFile('greetings.txt', greetings, (err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("Greetings saved successfully.");
    });
});
