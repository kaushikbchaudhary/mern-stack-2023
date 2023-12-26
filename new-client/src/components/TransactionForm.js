// import { useState } from 'react';
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';

const initialForm = {
  amount: 0,
  description: '',
  date: '',
};
export default function TransactionForm() {
  const [form, setForm] = useState(initialForm);
  const handleChange = function (e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/transaction', {
        method: 'post',
        body: JSON.stringify(form),
        headers: { 'Content-Type': ' application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setForm(initialForm);
        fetchTransctions();
        // console.log('Response data:', JSON.parse(data));
        console.log('Response data:', data);
      } else {
        console.log('Response status:', res.status);
      }
    } catch (err) {
      console.error('fetch error:', err);
    }
  }

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const res = await fetch('http://localhost:4000/transaction');
    const { data } = await res.json();
    setTransactions(data);
  }
  // return (
  //   <div>
  //     <AppBar />
  //     <TransactionForm />
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="number"
  //         name="amount"
  //         value={form.amount}
  //         onChange={handleChange}
  //         placeholder="Enter transection amount"
  //       />
  //       <input
  //         type="text"
  //         name="description"
  //         value={form.description}
  //         onChange={handleChanege}
  //         placeholder="Enter transection details"
  //       />
  //       <input
  //         type="Date"
  //         name="date"
  //         value={form.date}
  //         onChange={handleChanege}
  //         // placeholder="DD/MM/YYYY"
  //       />
  //       <button type="submit">submit</button>
  //     </form>

  //     <table>
  //       <thead>
  //         <th>Amount</th>
  //         <th>Description</th>
  //         <th>Date</th>
  //       </thead>
  //       <tbody>
  //         {transactions.map((trx) => (
  //           <tr key={trx._id}>
  //             <td>{trx.amount}</td>
  //             <td>{trx.description}</td>
  //             <td>{trx.date}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  // function handleChange() {}
  return (
    <Card sx={{ minWidth: 275, marginTop: '100px' }}>
      <CardContent>
        <Typography variant="h6">Add New Transection</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginRight: '10px' }}
            id="outlined-basic"
            label="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
          <TextField
            sx={{ marginRight: '10px' }}
            id="outlined-basic"
            label="Description"
            value={form.amount}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transection date"
              slotProps={{ textField: { size: 'small' } }}
              inputFormat="MM/DD/YYYY"
              name="date"
              value={form.date}
              onChange={handleChange}
              sx={{
                marginRight: '10px',
              }}
              renderInput={(params) => (
                <TextField size="small" {...params}></TextField>
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            submit
          </Button>
        </form>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                <td>{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
