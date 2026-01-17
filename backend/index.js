require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/jobs', require('./api/routes/jobs'));
app.use('/api/bookings', require('./api/routes/bookings'));

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
