
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'nexshop-secret-key';
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

// Setup hardcoded admin credentials
const ADMIN_EMAIL = 'admin@nexshop.com';
const ADMIN_PASSWORD = 'nexshop123';

export const registerUser = async (
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string
) => {
  try {
    // Check if trying to register with admin email
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      throw new Error('This email cannot be used for registration');
    }

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const user = new User({
      email,
      password,
      firstName: firstName || '',
      lastName: lastName || '',
      isAdmin: false // Regular users are never admins
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
    // Check if this is the admin trying to login
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      if (password === ADMIN_PASSWORD) {
        // Admin login successful
        // Create a special admin token or session
        const adminId = 'admin-special-id';
        const token = generateToken(adminId);
        
        return {
          user: {
            id: adminId,
            email: ADMIN_EMAIL,
            firstName: 'Admin',
            lastName: 'User',
            isAdmin: true
          },
          token
        };
      } else {
        throw new Error('Invalid admin credentials');
      }
    }

    // Regular user login
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
    // Special case for admin
    if (userId === 'admin-special-id') {
      return {
        id: 'admin-special-id',
        email: ADMIN_EMAIL,
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true
      };
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};
