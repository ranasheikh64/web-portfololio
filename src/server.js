require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/education', require('./routes/education'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ── Catch-all: serve index.html for SPA ──────────────────────────────────────
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ── MongoDB + Start ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅  MongoDB connected');
    })
    .catch(err => {
        console.error('❌  MongoDB connection failed:', err.message);
        console.warn('⚠️   Server starting without database connection...');
    });

if (require.main === module) {
    app.listen(PORT, () =>
        console.log(`🚀  Server running at http://localhost:${PORT}`)
    );
}

module.exports = app;

