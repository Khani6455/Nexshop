
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const registerUser = async (
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string
) => {
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const user = new User({
      email,
      password,
      firstName: firstName || '',
      lastName: lastName || ''
    });
    
    await user.save();
    
    const token = generateToken(user._id.toString());
    
    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Now TypeScript knows that user has the comparePassword method
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    
    const token = generateToken(user._id.toString());
    
    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};
