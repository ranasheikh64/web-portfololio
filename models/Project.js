const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: String,
    thumb: { type: Number, default: 1 },  // 1-6 for CSS class
    mock: { type: String, default: '📱' },
    badgeType: { type: String, enum: ['flutter', 'android', 'web', 'other'], default: 'flutter' },
    tech: [String],
    githubUrl: String,
    demoUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
