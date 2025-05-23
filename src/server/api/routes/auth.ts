
import express from 'express';
import { registerUser, loginUser, getUserById } from '../../services/auth';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const result = await registerUser(email, password, firstName, lastName);
    res.status(201).json(result);
  } catch (error: any) {
    console.error('Registration error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    console.log('Login attempt for email:', email);
    const result = await loginUser(email, password);
    console.log('Login successful for:', email);
    res.json(result);
  } catch (error: any) {
    console.error('Login error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await getUserById((req as any).userId);
    res.json(user);
  } catch (error: any) {
    console.error('Get user error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

export default router;
