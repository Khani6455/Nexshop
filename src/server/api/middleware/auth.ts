
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../services/auth';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = verifyToken(token);
    (req as AuthenticatedRequest).userId = decoded.id;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    
    const user = await import('../../models/User').then(module => 
      module.default.findById(userId)
    );
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
