const router = require('express').Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

// GET all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create skill
router.post('/', auth, async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update skill
router.put('/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(skill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE skill
router.delete('/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
