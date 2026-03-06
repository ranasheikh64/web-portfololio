const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    period: { type: String, required: true },  // e.g. "2023 — Present"
    title: { type: String, required: true },
    company: String,
    desc: String,
    dotColor: { type: String, default: 'var(--flutter-sky)' },
    glowColor: { type: String, default: 'var(--glow-blue)' },
    order: { type: Number, default: 0 },      // lower = shown first (most recent)
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
