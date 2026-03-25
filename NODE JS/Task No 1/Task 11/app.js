const fs = require('fs');
const generateNumber = require('./randomNumber');
for (let i = 0; i < 5; i++) {
    fs.appendFileSync('randomNumbers.txt', generateNumber() + '\n');
}
console.log("Random numbers saved successfully.");