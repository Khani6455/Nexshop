
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define interface for User document with methods
interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Interface for User methods
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create a new Model type that combines both document and methods
type UserModel = Document<unknown, {}, IUser> & IUser & IUserMethods;

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords - adding to schema.methods
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;
