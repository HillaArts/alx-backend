import kue from 'kue';

const queue = kue.createQueue();

queue.process('reserve_seat', async (job, done) => {
  const currentSeats = await getCurrentAvailableSeats();
  if (currentSeats <= 0) {
    reservationEnabled = false;
    return done(new Error('Not enough seats available'));
  }

  await reserveSeat(currentSeats - 1);
  done();
});

queue.on('job complete', (id, result) => {
  console.log(`Seat reservation job ${id} completed`);
});

queue.on('job failed', (id, errorMessage) => {
  console.log(`Seat reservation job ${id} failed: ${errorMessage}`);
});

export default queue;