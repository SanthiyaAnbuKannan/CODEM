const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', (req, res) => {
    console.log("Admin route accessed");
    res.json({ message: "Welcome Admin" });
});

module.exports = router;