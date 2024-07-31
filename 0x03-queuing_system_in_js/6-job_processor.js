import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

/**
 * Sends a notification.
 * @param {string} phoneNumber - The recipient's phone number.
 * @param {string} message - The notification message.
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process the queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
