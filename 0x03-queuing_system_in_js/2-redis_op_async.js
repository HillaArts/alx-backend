// 2-redis_op_async.js
import redis from 'redis';
import { promisify } from 'util';

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
 * Displays the value of the given school name key from the Redis store using async/await.
 * @param {string} schoolName - The key whose value needs to be fetched.
 */
async function displaySchoolValue(schoolName) {
  const getAsync = promisify(client.get).bind(client);
  try {
    const result = await getAsync(schoolName);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

// Example calls
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');