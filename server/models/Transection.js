import mongoose from 'mongoose';
// import { Schema } from 'mongoose';
const { Schema } = mongoose;

const transectionSchema = new Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: new Date() },
  createdAt: { type: Date, default: Date.now },
});

export default new mongoose.model('Transection', transectionSchema);
