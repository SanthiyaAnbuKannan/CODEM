const express = require('express');
const router = express.Router();

// Logging
router.use((req, res, next) => {
    console.log("Task17:", req.method, req.url);
    next();
});

router.get('/', (req, res) => {
    res.json({ message: "User routes working" });
});

module.exports = router;