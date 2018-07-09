import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  displayName: String,
  username: String,
  email: String,
  password: String,
  createdAt: Date,
});

export default mongoose.model('User', user);
