import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

/**
 * Sets a new school name and value in the Redis store.
 * @param {string} schoolName - The key to set in Redis.
 * @param {string} value - The value to set for the given key.
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Displays the value of the given school name key from the Redis store.
 * @param {string} schoolName - The key whose value needs to be fetched.
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
}

// Example calls
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
