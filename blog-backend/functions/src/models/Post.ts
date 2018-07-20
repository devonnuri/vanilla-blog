import { Schema, model } from 'mongoose';

const post = new Schema({
  id: Number,
  title: String,
  body: String,
  createdAt: Date
});

export default model('Post', post);
