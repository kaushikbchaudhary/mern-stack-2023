import { Router } from 'express';
import Transection from '../models/Transection.js';

const router = Router();
router.get('/', async (req, res) => {
  const transaction = await Transection.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction });
});

router.post('/', async (req, res) => {
  const { amount, description, date } = req.body;
  const transection = new Transection({
    amount,
    description,
    date,
  });
  await transection.save();
  res.json({ message: 'success' });
});

export default router;
