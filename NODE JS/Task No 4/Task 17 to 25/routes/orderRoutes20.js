const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("Task20 Orders");
    res.json({ message: "Orders API working" });
});

module.exports = router;