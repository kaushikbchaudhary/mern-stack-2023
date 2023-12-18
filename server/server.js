import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// let cors = require('cors');
const PORT = 4000;
const app = express();
app.use(cors);
await mongoose.connect(
  'mongodb+srv://kaushikchaudhary730:Mern22213@cluster0.7oswpll.mongodb.net/?retryWrites=true&w=majority'
);
console.log('MongoDB connection is successful');

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:4000');
});
