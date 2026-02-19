const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (Admin)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete user (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.json({ msg: 'User removed' });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
