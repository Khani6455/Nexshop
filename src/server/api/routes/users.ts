
import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth';

const router = express.Router();
const User = require('../../models/User').default;

// Get all users (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user to admin (admin only)
router.put('/:id/make-admin', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isAdmin = true;
    await user.save();
    
    res.json({ message: 'User updated to admin successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Remove admin privileges (admin only)
router.put('/:id/remove-admin', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isAdmin = false;
    await user.save();
    
    res.json({ message: 'Admin privileges removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
