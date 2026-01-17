const express = require('express');
const router = express.Router();

const db = require('../../neon/connection');

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

// CREATE a booking
router.post('/', async (req, res) => {
    const { title, description, date, time, phone_number, email, user_id, image_url } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO bookings (title, description, date, time, phone_number, email, user_id, image_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [title, description, date, time, phone_number, email, user_id, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create booking" });
    }
});

// UPDATE a booking
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, date, time, phone_number, email, image_url } = req.body;
    try {
        const result = await db.query(
            `UPDATE bookings SET title=$1, description=$2, date=$3, time=$4, phone_number=$5, email=$6, image_url=$7
             WHERE id=$8 RETURNING *`,
            [title, description, date, time, phone_number, email, image_url, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update booking" });
    }
});

// DELETE a booking
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM bookings WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete booking" });
    }
});

module.exports = router;
