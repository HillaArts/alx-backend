import express from 'express';
import { reserveSeat, getCurrentAvailableSeats, client, reservationEnabled } from './utils.js';
import queue from './queue.js';

const app = express();
const port = 1245;

// Initialize the number of seats to 50 on server start
reserveSeat(50);

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });
});

app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });
  queue.process('reserve_seat');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});