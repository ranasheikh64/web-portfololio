const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: String,                       // emoji or icon class
    type: { type: String, enum: ['flutter', 'android', 'backend', 'tools'] },
    desc: String,
    tags: [String],
    order: { type: Number, default: 0 },

    // proficiency bar
    barName: String,
    barPct: Number,
    barClass: String,                       // fill-flutter, fill-android, etc.
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
