import mongoose, { Schema } from 'mongoose';

const post = new Schema({
  title: String,
  body: String,
  author: String,
  createdAt: Date,
});

export default mongoose.model('Post', post);
