const fs = require('fs');
fs.readFile('important.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }
    fs.writeFile('important_backup.txt', data, (err) => {
        if (err) {
            console.log("Error writing backup file");
            return;
        }
        console.log("Backup created successfully");
    });
});