import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: { type: String, default: "default.jpg" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
});

// Create and export the model only if it doesn't already exist
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
