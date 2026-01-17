const express = require('express');
const router = express.Router();

// Placeholder for Auth routes
const db = require('../../neon/connection');

// Sync Firebase User to Postgres
router.post('/signup', async (req, res) => {
    const { uid, email, role } = req.body;
    try {
        await db.query(
            'INSERT INTO users (id, email, role) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
            [uid, email, role || 'consumer']
        );
        res.json({ success: true, message: "User synced to DB" });
    } catch (error) {
        console.error("Auth Sync Error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', (req, res) => {
    res.json({ message: "Login endpoint" });
});

module.exports = router;
