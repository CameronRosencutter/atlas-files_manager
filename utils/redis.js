/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: '127.0.0.1', // Default is '127.0.0.1'
      // eslint-disable-next-line comma-dangle
      port: 6379 // Default is 6379
    });

    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) return reject(err);
        resolve(value);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
