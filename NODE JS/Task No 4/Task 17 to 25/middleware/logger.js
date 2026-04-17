module.exports = (req, res, next) => {
    console.log("Task24 Log:", req.method, req.url);
    next();
};