const quotes = [
    "Success is not final, failure is not fatal.",
    "Believe you can and you're halfway there.",
    "Dream big and dare to fail.",
    "Do something today that your future self will thank you for.",
    "Push yourself, because no one else is going to do it for you."
];
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
module.exports = getRandomQuote;