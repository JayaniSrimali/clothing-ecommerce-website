const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users (Admin)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

const { protect } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        });
    } else {
        res.status(404).json({ msg: 'User not found' });
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
