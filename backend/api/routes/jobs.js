const express = require('express');
const router = express.Router();
// const db = require('../../neon/connection'); // specific path

// Placeholder for Jobs routes
router.get('/', (req, res) => {
    res.json({ message: "Get all jobs" });
});

router.post('/', (req, res) => {
    res.json({ message: "Create job" });
});

module.exports = router;
