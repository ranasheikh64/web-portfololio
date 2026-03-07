const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create project
router.post('/', auth, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update project
router.put('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE project
router.delete('/:id', auth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
