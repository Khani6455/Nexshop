
import mongoose from 'mongoose';

// MongoDB connection string - should be in an environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-connection-string';

// Initialize MongoDB connection
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

export default mongoose;
