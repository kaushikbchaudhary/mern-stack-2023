import cors from 'cors';
import express from 'express';
import transactionRouters from './routes/TransactionApi.js';
import connect from './database/mongodb.js';
// import { connect } from 'mongoose';
// import bodyParser from 'body-parser';
const PORT = 4000;
const app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

await connect();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/transaction', transactionRouters);

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:4000');
});
