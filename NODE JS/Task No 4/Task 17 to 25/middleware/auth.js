module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    console.log("Auth Middleware Triggered");

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        });
    }

    if (token === "admin123") {
        console.log("Valid token - access granted");
        next();
    } else {
        console.log("Invalid token");
        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        });
    }
};