const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.use(auth);

router.get('/dashboard', (req, res) => {
    console.log("Admin dashboard accessed");
    res.json({ message: "Access granted to admin dashboard" });
});

module.exports = router;