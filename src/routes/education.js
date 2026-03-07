const router = require('express').Router();
const Education = require('../models/Education');
const auth = require('../middleware/auth');

// GET all education entries
router.get('/', async (req, res) => {
    try {
        const edu = await Education.find().sort({ order: 1 });
        res.json(edu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create entry
router.post('/', auth, async (req, res) => {
    try {
        const edu = await Education.create(req.body);
        res.status(201).json(edu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update entry
router.put('/:id', auth, async (req, res) => {
    try {
        const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(edu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE entry
router.delete('/:id', auth, async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education entry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
