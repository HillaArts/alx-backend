const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const getAsync = promisify(client.get).bind(client);