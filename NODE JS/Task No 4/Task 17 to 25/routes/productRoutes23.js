const express = require('express');
const router = express.Router();

// Router-specific logging
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - 200`);
    next();
});

router.get('/', (req, res) => {
    res.json({ message: "Products API working" });
});

module.exports = router;