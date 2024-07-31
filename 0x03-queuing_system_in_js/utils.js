import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

let reservationEnabled = true;

export const getItemById = (id) => listProducts.find(item => item.itemId === id);

export const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

export const getCurrentAvailableSeats = async () => {
  const availableSeats = await getAsync('available_seats');
  return availableSeats ? parseInt(availableSeats, 10) : 0;
};

export const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

export const getCurrentReservedStockById = async (itemId) => {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock !== null ? parseInt(reservedStock, 10) : 0;
};

export { client, reservationEnabled };