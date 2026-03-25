const fs = require('fs');
fs.readdir('assets', (err, files) => {
    if (err) {
        console.log("Error reading directory");
        return;
    }
    fs.writeFile('fileList.txt', files.join('\n'), (err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("File list saved successfully.");
    });
});