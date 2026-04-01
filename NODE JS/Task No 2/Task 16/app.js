const http = require("http");

function getSales() {
    return new Promise(resolve => setTimeout(() => resolve(85000), 200));
}
function getExpenses() {
    return new Promise(resolve => setTimeout(() => resolve(32000), 200));
}
function getRefunds() {
    return new Promise(resolve => setTimeout(() => resolve(4500), 200));
}

function calcProfit(sales, expenses, refunds) {
    return new Promise(resolve => setTimeout(() => resolve(sales - expenses - refunds), 200));
}
function calcTax(profit) {
    return new Promise(resolve => setTimeout(() => resolve(Math.round(profit * 0.18)), 200));
}
function formatReport(sales, expenses, profit, tax) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                sales,
                expenses,
                profit,
                tax,
                netAfterTax: profit - tax
            });
        }, 200);
    });
}

const server = http.createServer(async (req, res) => {
    if (req.url === "/aggregate") {
        console.time("aggregateTime");
        const start = Date.now();

        const [sales, expenses, refunds] = await Promise.all([
            getSales(),
            getExpenses(),
            getRefunds()
        ]);

        const profit = await calcProfit(sales, expenses, refunds);
        const tax = await calcTax(profit);
        const report = await formatReport(sales, expenses, profit, tax);

        report.timeTaken = `${Date.now() - start}ms`;

        console.timeEnd("aggregateTime");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(report, null, 2));
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3008, () => {
    console.log("Task 16 server running on http://localhost:3008");
});