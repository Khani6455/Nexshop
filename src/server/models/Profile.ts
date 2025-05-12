
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  profilePicture: String,
  preferences: {
    type: Map,
    of: String
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
