const router = require('express').Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// GET profile
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update profile
router.put('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
