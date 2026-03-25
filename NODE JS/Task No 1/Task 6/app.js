const fs = require('fs');
fs.readdir('documents', (err, files) => {
    if (err) {
        console.log("Error reading directory");
        return;
    }
    console.log("Total Files in documents folder:", files.length);
});