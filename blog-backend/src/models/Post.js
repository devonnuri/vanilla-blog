import mongoose, { Schema } from 'mongoose';

const post = new Schema({
  title: String,
  body: String,
  createdAt: Date,
});

export default mongoose.model('Post', post);
