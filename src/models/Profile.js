const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: [String],                  // e.g. ['Flutter', 'Android']
    tagline: String,
    description: String,
    email: String,
    available: { type: Boolean, default: true },
    stats: {
        appsBuilt: Number,
        yearsExp: Number,
        happyClients: Number,
        githubRepos: Number,
    },
    socials: {
        github: String,
        linkedin: String,
        twitter: String,
        playStore: String,
        whatsapp: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
