const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    period: { type: String, required: true },
    degree: { type: String, required: true },
    school: String,
    icon: { type: String, default: '🎓' },
    desc: String,
    tags: [String],
    dotColor: { type: String, default: 'var(--flutter-sky)' },
    glowColor: { type: String, default: 'var(--glow-blue)' },
    tagColor: { type: String, default: 'var(--flutter-sky)' },
    tagBorder: { type: String, default: 'rgba(84,197,248,0.3)' },
    tagBg: { type: String, default: 'rgba(84,197,248,0.08)' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
