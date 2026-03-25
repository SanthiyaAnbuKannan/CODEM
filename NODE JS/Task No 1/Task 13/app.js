const fs = require('fs');
fs.readFile('numbers.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }
    const evenNumbers = data
        .trim()
        .split('\n')
        .filter(num => Number(num) % 2 === 0)
        .join('\n');
    fs.writeFile('evenNumbers.txt', evenNumbers, (err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("Even numbers saved successfully.");
    });
});